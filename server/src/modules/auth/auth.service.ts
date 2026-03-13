import { prisma } from "../../config";
import { LoginDto, RegisterDto } from "./auth.types";
import {
  comparePassword,
  hashPassword,
  randomString,
  signJwt,
  stringHash,
} from "../../shared/lib";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { DAY, DUMMY_HASH, PRISMA_ERROR_CODES, WEEK } from "../../constants";
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from "../../shared/errors";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor() {}

  private async refreshToken(userId: string): Promise<string> {
    const refreshToken = randomString();
    const tokenHash = stringHash(refreshToken);
    await prisma.session.create({
      data: {
        userId,
        tokenHash: tokenHash,
        expiresAt: WEEK,
        refreshTokens: {
          create: {
            tokenHash: refreshToken,
            expiresAt: DAY,
          },
        },
      },
    });
    return refreshToken;
  }

  private async accessToken(userId: string): Promise<string> {
    return await signJwt({
      sub: userId,
      type: "access",
    });
  }

  register = async (data: RegisterDto) => {
    try {
      const passwordHash = await hashPassword(data.password);
      return await prisma.user.create({
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
          updatedAt: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERROR_CODES.CONFLICT) {
          throw new ConflictException(
            `${data.email} already exists. Please try a different email.`,
          );
        }
      }
      throw new InternalServerErrorException();
    }
  };

  login = async (data: LoginDto) => {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    const passwordToCheck: string = user?.passwordHash ?? DUMMY_HASH;
    const isPasswordValid = await comparePassword(
      passwordToCheck,
      data.password,
    );

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const refreshToken = await this.refreshToken(user.id);
    const accessToken = await this.accessToken(user.id);
    return { accessToken, refreshToken };
  };

  async logout(token: string): Promise<void> {
    const tokenHash = stringHash(token);
    await prisma.session.deleteMany({
      where: {
        refreshTokens: {
          some: {
            tokenHash,
          },
        },
      },
    });
  }

  async refresh(token: string) {
    try {
      const tokenHash = stringHash(token);
      const refreshToken = randomString();
      const newTokenHash = stringHash(refreshToken);
      const { session } = await prisma.refreshToken.update({
        where: {
          tokenHash,
          expiresAt: { gt: new Date() },
          session: {
            expiresAt: { gt: new Date() },
          },
        },
        data: {
          tokenHash: newTokenHash,
          expiresAt: DAY,
        },
        select: { session: { select: { user: { select: { id: true } } } } },
      });

      const accessToken = await this.accessToken(session.user.id);

      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERROR_CODES.NOT_FOUND) {
          throw new UnauthorizedException(
            "Invalid or expired refresh token. Please login again.",
          );
        }
      }
      throw new InternalServerErrorException();
    }
  }

  me = async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (user) return user;
    throw new UnauthorizedException();
  };
}
