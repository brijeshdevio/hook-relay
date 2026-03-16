import { Hono } from "hono";
import { appError } from "./common/errors";
// import { routes } from "./routes";
import "./workers/webhook.worker";

// routes
import { AuthController } from "./modules/auth/auth.controller";
import { authMiddleware } from "./common/middleware";
import { AuthService } from "./modules/auth/auth.service";

const app = new Hono();

app.get("/", (c) => c.text("Welcome to Hono!"));

app.get("/health", (c) => c.text("OK"));

// app.route("/api", routes);
app.get("/me", authMiddleware, new AuthController(new AuthService()).me);

app.onError(appError);

export default app;
