import { Hono } from "hono";
import { zodValidator } from "../../common/validators";
import { authMiddleware } from "../../common/middleware";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LoginSchema, RegisterSchema } from "./auth.schema";

export const authRoutes = new Hono();
const controller = new AuthController(new AuthService());

authRoutes.post("/register", zodValidator(RegisterSchema), controller.register);
authRoutes.post("/login", zodValidator(LoginSchema), controller.login);
authRoutes.post("/logout", controller.logout);
authRoutes.post("/refresh", controller.refresh);
authRoutes.get("/me", authMiddleware, controller.me);
