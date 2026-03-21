import { CreateEndpointDto, UpdateEndpointDto } from "./endpoint.types";
import { prisma } from "../../config";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PRISMA_CODES } from "../../constants";
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
} from "../../common/errors";
import { randomString } from "../../common/utils";

export class EndpointService {
  constructor() {}

  async create(userId: string, data: CreateEndpointDto) {
    try {
      const slug = randomString(6);
      return await prisma.endpoint.create({
        data: {
          userId,
          name: data.name,
          description: data.description,
          slug,
          listenUrl: data.listenUrl,
          forwardUrl: data.forwardUrl,
        },
        omit: {
          userId: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.CONFLICT
      ) {
        throw new ConflictException(
          `${data.name} already exists. Use another name.`,
        );
      }

      throw new InternalServerErrorException();
    }
  }

  async findAll(userId: string) {
    return await prisma.endpoint.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        listenUrl: true,
        forwardUrl: true,
        createdAt: true,
        isActive: true,
        lastReceivedAt: true,
        totalDelivered: true,
        totalFailed: true,
        totalReceived: true,
      },
    });
  }

  async findOne(userId: string, id: string) {
    const endpoint = await prisma.endpoint.findUnique({
      where: { userId, id },
      omit: {
        userId: true,
      },
    });
    if (endpoint) return endpoint;

    throw new ForbiddenException();
  }

  async update(userId: string, id: string, data: UpdateEndpointDto) {
    try {
      await prisma.endpoint.update({
        where: {
          userId,
          id,
        },
        data: {
          name: data.name,
          description: data.description,
        },
      });
      return data;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          throw new ForbiddenException();
        }

        if (error.code === PRISMA_CODES.CONFLICT) {
          throw new ConflictException(
            `${data.name} already exists. Use another name.`,
          );
        }
      }

      throw new InternalServerErrorException();
    }
  }

  async delete(userId: string, id: string) {
    try {
      await prisma.endpoint.delete({
        where: {
          userId,
          id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          throw new ForbiddenException();
        }
      }

      throw new InternalServerErrorException();
    }
  }
}
