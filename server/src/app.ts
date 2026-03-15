import { Hono } from "hono";
// import { routes } from "./routes";
import { appError } from "./common/errors";
import "./workers/webhook.worker";
import { AuthController } from "./modules/auth/auth.controller";
import { AuthService } from "./modules/auth/auth.service";

const app = new Hono();

app.get("/", (c) => c.text("Welcome to Hono!"));

app.get("/health", (c) => c.text("OK"));

const authController = new AuthController(new AuthService());
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);
app.post("/api/auth/logout", authController.logout);
app.post("/api/auth/refresh", authController.refresh);
app.get("/api/auth/me", authController.me);

app.onError(appError);

export default app;
