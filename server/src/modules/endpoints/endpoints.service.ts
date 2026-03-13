import { nanoid } from "nanoid";
import { prisma } from "../../config";
import { CreateEndpointDto } from "./endpoints.types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PRISMA_ERROR_CODES } from "../../constants";
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
} from "../../shared/errors";

export class EndpointsService {
  constructor() {}

  create = async (userId: string, data: CreateEndpointDto) => {
    const slug = nanoid();
    try {
      return await prisma.endpoint.create({
        data: {
          userId,
          slug,
          name: data.name,
          description: data?.description,
          listenUrl: data.listenUrl,
          forwardUrl: data.forwardUrl,
        },
        select: {
          id: true,
          name: true,
          description: true,
          listenUrl: true,
          forwardUrl: true,
          slug: true,
          createdAt: true,
        },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERROR_CODES.CONFLICT) {
          throw new ConflictException(
            `${data.name} already exists. Please try a different name.`,
          );
        }
      }
      throw new InternalServerErrorException();
    }
  };

  findMany = async (userId: string) => {
    return await prisma.endpoint.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        listenUrl: true,
        forwardUrl: true,
        slug: true,
        createdAt: true,
      },
    });
  };

  delete = async (userId: string, id: string) => {
    try {
      await prisma.endpoint.delete({
        where: {
          id,
          userId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERROR_CODES.NOT_FOUND) {
          throw new ForbiddenException();
        }
      }
      throw new InternalServerErrorException();
    }
  };

  findManyRequest = async (userId: string, endId: string) => {
    return await prisma.webhookRequest.findMany({
      where: { endpointId: endId, endpoint: { userId } },
      select: {
        id: true,
        headers: true,
        responseBody: true,
        createdAt: true,
      },
    });
  };

  findOneRequest = async (
    userId: string,
    {
      endId,
      reqId,
    }: {
      endId: string;
      reqId: string;
    },
  ) => {
    try {
      return await prisma.webhookRequest.findFirstOrThrow({
        where: {
          id: reqId,
          endpointId: endId,
          endpoint: {
            userId,
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERROR_CODES.NOT_FOUND) {
          throw new ForbiddenException();
        }
      }
      throw new InternalServerErrorException();
    }
  };

  replyRequest = async (
    userId: string,
    {
      endId,
      reqId,
    }: {
      endId: string;
      reqId: string;
    },
  ) => {};
}
