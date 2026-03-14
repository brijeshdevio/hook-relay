import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { prisma } from "../../config";
import { PRISMA_CODES } from "../../constants";
import {
  ForbiddenException,
  InternalServerErrorException,
} from "../../common/errors";

export class WebhookService {
  constructor() {}

  async checkWebhook(slug: string) {
    const endpoint = await prisma.endpoint.findUnique({
      where: {
        slug,
        isActive: true,
      },
      select: {
        id: true,
      },
    });
    if (endpoint) return endpoint;

    throw new ForbiddenException();
  }

  async findAll(userId: string, endpointId: string) {
    return await prisma.webhookRequest.findMany({
      where: {
        endpointId,
        endpoint: {
          userId,
        },
      },
    });
  }
}
