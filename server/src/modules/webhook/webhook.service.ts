import { prisma } from "../../config";
import {
  ForbiddenException,
  InternalServerErrorException,
} from "../../common/errors";
import { pinoLogger } from "../../common/logger/pino";

export class WebhookService {
  constructor() {}

  async checkWebhook(slug: string) {
    try {
      pinoLogger.debug({ slug }, "Webhook endpoint verification attempt");

      const endpoint = await prisma.endpoint.findUnique({
        where: {
          slug,
          isActive: true,
        },
        select: {
          id: true,
        },
      });

      if (endpoint) {
        pinoLogger.info(
          { slug, endpointId: endpoint.id },
          "Webhook endpoint verified",
        );

        return endpoint;
      }

      pinoLogger.warn({ slug }, "Webhook endpoint forbidden or inactive");

      throw new ForbiddenException();
    } catch (error) {
      pinoLogger.error({ error, slug }, "Webhook verification failed");

      throw new InternalServerErrorException();
    }
  }

  async findAll(userId: string, endpointId: string) {
    try {
      pinoLogger.debug(
        { userId, endpointId },
        "Fetching webhook requests for endpoint",
      );

      const webhooks = await prisma.webhookRequest.findMany({
        where: {
          endpointId,
          endpoint: {
            userId,
          },
        },
      });

      pinoLogger.info(
        { userId, endpointId, count: webhooks.length },
        "Webhook requests fetched successfully",
      );

      return webhooks;
    } catch (error) {
      pinoLogger.error(
        { error, userId, endpointId },
        "Failed to fetch webhook requests",
      );

      throw new InternalServerErrorException();
    }
  }
}
