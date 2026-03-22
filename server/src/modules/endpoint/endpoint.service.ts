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
import { pinoLogger } from "../../common/logger/pino";

export class EndpointService {
  constructor() {}

  async create(userId: string, data: CreateEndpointDto) {
    try {
      pinoLogger.info({ userId, name: data.name }, "Endpoint creation attempt");

      const slug = randomString(6);

      const endpoint = await prisma.endpoint.create({
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

      pinoLogger.info(
        { userId, endpointId: endpoint.id, slug },
        "Endpoint created successfully",
      );

      return endpoint;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.CONFLICT
      ) {
        pinoLogger.warn(
          { userId, name: data.name },
          "Endpoint creation conflict",
        );

        throw new ConflictException(
          `${data.name} already exists. Use another name.`,
        );
      }

      pinoLogger.error({ error, userId }, "Endpoint creation failed");

      throw new InternalServerErrorException();
    }
  }

  async findAll(userId: string) {
    pinoLogger.debug({ userId }, "Fetching all endpoints");

    const endpoints = await prisma.endpoint.findMany({
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

    pinoLogger.info(
      { userId, count: endpoints.length },
      "Endpoints fetched successfully",
    );

    return endpoints;
  }

  async findOne(userId: string, id: string) {
    pinoLogger.debug({ userId, endpointId: id }, "Fetching endpoint");

    const endpoint = await prisma.endpoint.findUnique({
      where: { userId, id },
      omit: {
        userId: true,
      },
    });

    if (endpoint) {
      pinoLogger.info(
        { userId, endpointId: id },
        "Endpoint fetched successfully",
      );
      return endpoint;
    }

    pinoLogger.warn(
      { userId, endpointId: id },
      "Endpoint access forbidden or not found",
    );

    throw new ForbiddenException();
  }

  async update(userId: string, id: string, data: UpdateEndpointDto) {
    try {
      pinoLogger.info({ userId, endpointId: id }, "Endpoint update attempt");

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

      pinoLogger.info(
        { userId, endpointId: id },
        "Endpoint updated successfully",
      );

      return data;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          pinoLogger.warn(
            { userId, endpointId: id },
            "Endpoint update forbidden or not found",
          );

          throw new ForbiddenException();
        }

        if (error.code === PRISMA_CODES.CONFLICT) {
          pinoLogger.warn(
            { userId, name: data.name },
            "Endpoint update conflict",
          );

          throw new ConflictException(
            `${data.name} already exists. Use another name.`,
          );
        }
      }

      pinoLogger.error(
        { error, userId, endpointId: id },
        "Endpoint update failed",
      );

      throw new InternalServerErrorException();
    }
  }

  async delete(userId: string, id: string) {
    try {
      pinoLogger.info({ userId, endpointId: id }, "Endpoint delete attempt");

      await prisma.endpoint.delete({
        where: {
          userId,
          id,
        },
      });

      pinoLogger.info(
        { userId, endpointId: id },
        "Endpoint deleted successfully",
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          pinoLogger.warn(
            { userId, endpointId: id },
            "Endpoint delete forbidden or not found",
          );

          throw new ForbiddenException();
        }
      }

      pinoLogger.error(
        { error, userId, endpointId: id },
        "Endpoint delete failed",
      );

      throw new InternalServerErrorException();
    }
  }
}
