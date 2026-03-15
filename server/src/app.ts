import { Hono } from "hono";
// import { routes } from "./routes";
import { appError } from "./common/errors";
import "./workers/webhook.worker";
import { AuthController } from "./modules/auth/auth.controller";
import { AuthService } from "./modules/auth/auth.service";

const app = new Hono();
const routes = new Hono();

app.get("/", (c) => c.text("Welcome to Hono!"));

app.get("/health", (c) => c.text("OK"));

const authController = new AuthController(new AuthService());
routes.post("/api/auth/register", authController.register);
routes.post("/api/auth/login", authController.login);
routes.post("/api/auth/logout", authController.logout);
routes.post("/api/auth/refresh", authController.refresh);
routes.get("/api/auth/me", authController.me);

app.onError(appError);

export default app;
