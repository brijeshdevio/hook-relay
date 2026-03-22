import argon2 from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { prisma } from "../../config";
import { LoginDto, RegisterDto } from "./auth.types";
import { DUMMY_HASH, PRISMA_CODES } from "../../constants";
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from "../../common/errors";
import { hashString, randomString, signJwt } from "../../common/utils";
import { pinoLogger } from "../../common/logger/pino";

export class AuthService {
  constructor() {}

  /* ----------------------------- Helpers ----------------------------- */

  private calculateExpiry(ms: number) {
    return new Date(Date.now() + ms);
  }

  private hashToken(token: string) {
    return hashString(token);
  }

  private generateAccessToken(userId: string): string {
    return signJwt({
      sub: userId,
      type: "access",
    });
  }

  private async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  private async comparePassword(passwordHash: string, password: string) {
    return await argon2.verify(passwordHash, password);
  }

  /**
   * Creates a new session + refresh token
   */
  private async createSession(userId: string): Promise<string> {
    const refreshToken = randomString();
    const tokenHash = this.hashToken(refreshToken);

    pinoLogger.debug({ userId }, "Creating new session");

    await prisma.session.create({
      data: {
        userId,
        tokenHash,
        expiresAt: this.calculateExpiry(7 * 24 * 60 * 60 * 1000),
        refreshTokens: {
          create: {
            tokenHash,
            expiresAt: this.calculateExpiry(24 * 60 * 60 * 1000),
          },
        },
      },
    });

    pinoLogger.info({ userId }, "Session created");

    return refreshToken;
  }

  /* ----------------------------- Register ----------------------------- */

  async register(data: RegisterDto) {
    pinoLogger.info("HELLO FROM SERVER");
    try {
      pinoLogger.info({ email: data.email }, "Register attempt");

      const passwordHash = await this.hashPassword(data.password);

      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      pinoLogger.info(
        { userId: user.id, email: user.email },
        "User registered successfully",
      );

      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.CONFLICT
      ) {
        pinoLogger.warn({ email: data.email }, "Register conflict");

        throw new ConflictException(
          `${data.email} already exists. Use another email.`,
        );
      }

      pinoLogger.error({ error }, "Register failed");

      throw new InternalServerErrorException();
    }
  }

  /* ----------------------------- Login ----------------------------- */

  async login(data: LoginDto) {
    pinoLogger.info({ email: data.email }, "Login attempt");

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    const passwordHash = user?.passwordHash ?? DUMMY_HASH;

    const isPasswordValid = await this.comparePassword(
      passwordHash,
      data.password,
    );

    if (!user || !isPasswordValid) {
      pinoLogger.warn({ email: data.email }, "Login failed");

      throw new UnauthorizedException("Invalid credentials");
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user.id),
      this.createSession(user.id),
    ]);

    pinoLogger.info({ userId: user.id, email: user.email }, "Login successful");

    return { accessToken, refreshToken };
  }

  /* ----------------------------- Logout ----------------------------- */

  async logout(refreshToken: string): Promise<void> {
    const tokenHash = this.hashToken(refreshToken);

    pinoLogger.debug("Logout attempt");

    const result = await prisma.session.deleteMany({
      where: {
        refreshTokens: {
          some: { tokenHash },
        },
      },
    });

    pinoLogger.info(
      { deletedSessions: result.count },
      "User logged out and session removed",
    );
  }

  /* ----------------------------- Refresh ----------------------------- */

  async refresh(refreshToken: string) {
    const tokenHash = this.hashToken(refreshToken);
    const newRefreshToken = randomString();
    const newTokenHash = this.hashToken(newRefreshToken);

    pinoLogger.debug("Refresh token attempt");

    try {
      const result = await prisma.$transaction(async (tx) => {
        const token = await tx.refreshToken.update({
          where: {
            tokenHash,
            expiresAt: { gt: new Date() },
            session: {
              expiresAt: { gt: new Date() },
            },
          },
          data: {
            tokenHash: newTokenHash,
            expiresAt: this.calculateExpiry(24 * 60 * 60 * 1000),
          },
          select: {
            session: {
              select: {
                user: {
                  select: { id: true },
                },
              },
            },
          },
        });

        const accessToken = await this.generateAccessToken(
          token.session.user.id,
        );

        return { accessToken, userId: token.session.user.id };
      });

      pinoLogger.info(
        { userId: result.userId },
        "Access token refreshed successfully",
      );

      return {
        accessToken: result.accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.NOT_FOUND
      ) {
        pinoLogger.warn("Invalid refresh token");

        throw new UnauthorizedException("Invalid or expired refresh token");
      }

      pinoLogger.error({ error }, "Refresh token failed");

      throw new InternalServerErrorException();
    }
  }

  /* ----------------------------- Me ----------------------------- */

  async me(userId: string) {
    pinoLogger.debug({ userId }, "Fetching current user");

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      pinoLogger.warn({ userId }, "User not found in me()");
      throw new UnauthorizedException();
    }

    return user;
  }
}
