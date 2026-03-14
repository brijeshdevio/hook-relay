import { Context } from "hono";
import { WebhookService } from "./webhook.service";
import { webhookQueue } from "../../queues/webhook.queue";

export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  receiveWebhook = async (c: Context) => {
    const slug = c.req.param("slug") as string;
    const body = await c.req.json();
    const headers = c.req.header();
    const endpoint = await this.webhookService.checkWebhook(slug);

    await webhookQueue.add("incoming-webhook", {
      endpointId: endpoint.id,
      body,
      headers,
      sourceIp: c.req.header("x-forwarded-for") ?? null,
    });

    return c.json({ success: true }, 200);
  };

  findAll = async (c: Context) => {
    const userId = c.get("user")?.id;
    const endpointId = c.req.param("endpointId") as string;
    const res = await this.webhookService.findAll(userId, endpointId);
    return c.json(res);
  };
}
