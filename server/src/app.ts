import { Hono } from "hono";
import { routes } from "./routes";
import { globalErrorHandler } from "./shared/middlewares";

const app = new Hono();

app.get("/", (c) => c.text("Welcome to Hono!"));

app.get("/health", (c) => c.text("OK"));

app.route("/api", routes);

app.onError(globalErrorHandler);

export default app;
