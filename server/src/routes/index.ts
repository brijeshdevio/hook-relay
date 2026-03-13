import { Hono } from "hono";
import { authRoutes } from "../modules/auth/auth.routes";
import { endpointsRoutes } from "../modules/endpoints/endpoints.routes";

export const routes = new Hono();

routes.route("/auth", authRoutes);
routes.route("/endpoints", endpointsRoutes);
