import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { appError } from "./common/errors";
import { env } from "./config";
import { routes } from "./routes";
import "./workers/webhook.worker";

const app = new Hono();

app.use(secureHeaders());
app.use(
  "*",
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.get("/", (c) => c.text("Welcome to Hono!"));

app.get("/health", (c) => c.text("OK"));

app.route("/", routes);

app.onError(appError);

export default app;
