import { Hono } from "hono";
import { authRoutes } from "../modules/auth/auth.routes";
import { endpointRoutes } from "../modules/endpoint/endpoint.routes";
import { webhookRoutes } from "../modules/webhook/webhook.routes";

export const routes = new Hono();

routes.route("/auth", authRoutes);
routes.route("/endpoints", endpointRoutes);
routes.route("/", webhookRoutes);
