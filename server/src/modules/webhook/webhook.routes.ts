import { Hono } from "hono";
import { WebhookController } from "./webhook.controller";
import { WebhookService } from "./webhook.service";
import { authMiddleware } from "../../common/middleware";

export const webhookRoutes = new Hono();
const controller = new WebhookController(new WebhookService());

webhookRoutes.post("/in/:slug", controller.receiveWebhook);
webhookRoutes.get("/:endpointId/requests", authMiddleware, controller.findAll);
