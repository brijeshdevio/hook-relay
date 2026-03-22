import { prisma } from "../config";
import { pinoLogger } from "../common/logger/pino";

export const deliveryService = {
  async process(data: any) {
    pinoLogger.info(
      { endpointId: data.endpointId, sourceIp: data?.sourceIp },
      "Webhook received",
    );

    const request = await prisma.webhookRequest.create({
      data: {
        endpointId: data.endpointId,
        headers: data?.headers || {},
        body: data?.body || {},
        sourceIp: data?.sourceIp,
      },
    });

    const endpoint = await prisma.endpoint.findUnique({
      where: { id: data.endpointId },
      select: { forwardUrl: true },
    });

    if (!endpoint) {
      pinoLogger.warn(
        { endpointId: data.endpointId, requestId: request.id },
        "Endpoint not found for webhook delivery",
      );
      return;
    }

    const start = Date.now();

    pinoLogger.debug(
      {
        requestId: request.id,
        endpointId: data.endpointId,
        forwardUrl: endpoint.forwardUrl,
      },
      "Forwarding webhook",
    );

    try {
      const res = await fetch(endpoint.forwardUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: data.body,
      });

      const responseTime = Date.now() - start;

      await prisma.webhookRequest.update({
        where: { id: request.id },
        data: {
          deliveryStatus: "DELIVERED",
          responseStatus: res.status,
          responseTimeMs: responseTime,
        },
      });

      pinoLogger.info(
        {
          requestId: request.id,
          endpointId: data.endpointId,
          status: res.status,
          responseTimeMs: responseTime,
        },
        "Webhook delivered successfully",
      );
    } catch (error) {
      await prisma.webhookRequest.update({
        where: { id: request.id },
        data: {
          deliveryStatus: "FAILED",
        },
      });

      pinoLogger.error(
        {
          error,
          requestId: request.id,
          endpointId: data.endpointId,
        },
        "Webhook delivery failed",
      );
    }
  },
};
