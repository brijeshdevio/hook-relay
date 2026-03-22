import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { logger } from "hono/logger";
import { pinoLogger } from "./common/logger/pino";
import { appError } from "./common/errors";
import { env } from "./config";
import { routes } from "./routes";
import "./workers/webhook.worker";

const app = new Hono();

app.use(logger());
app.use(secureHeaders());
app.use(
  "*",
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  pinoLogger.info({
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    time: Date.now() - start,
  });
});

app.get("/", (c) => c.text("Welcome to Hono!"));

app.get("/health", (c) => c.text("OK"));

app.route("/", routes);

app.onError(appError);

export default app;
