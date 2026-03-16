import { Hono } from "hono";
import { appError } from "./common/errors";
import { routes } from "./routes";
import "./workers/webhook.worker";

const app = new Hono();

app.get("/", (c) => c.text("Welcome to Hono!"));

app.get("/health", (c) => c.text("OK"));

app.route("/api", routes);

app.onError(appError);

export default app;
