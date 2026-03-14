import { prisma } from "../config";

export const deliveryService = {
  async process(data: any) {
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

    if (!endpoint) return;

    const start = Date.now();

    try {
      const res = await fetch(endpoint.forwardUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: data.body,
      });

      await prisma.webhookRequest.update({
        where: { id: request.id },
        data: {
          deliveryStatus: "DELIVERED",
          responseStatus: res.status,
          responseTimeMs: Date.now() - start,
        },
      });
    } catch (error) {
      await prisma.webhookRequest.update({
        where: { id: request.id },
        data: {
          deliveryStatus: "FAILED",
        },
      });
    }
  },
};
