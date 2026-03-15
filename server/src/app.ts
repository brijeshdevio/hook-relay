import { Hono } from "hono";
// import { routes } from "./routes";
import { appError } from "./common/errors";
import "./workers/webhook.worker";
import { authRoutes } from "./modules/auth/auth.routes";

const app = new Hono();

app.get("/", (c) => c.text("Welcome to Hono!"));

app.get("/health", (c) => c.text("OK"));

app.route("/api/auth", authRoutes);

app.onError(appError);

export default app;
