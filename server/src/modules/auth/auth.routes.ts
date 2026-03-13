import { Hono } from "hono";
import { authenticate, zodValidation } from "../../shared/middlewares";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LoginSchema, RegisterSchema } from "./auth.schema";
import { refreshToken } from "./auth.middlewares";

export const authRoutes = new Hono();

const authController = new AuthController(new AuthService());
authRoutes.post(
  "/register",
  zodValidation(RegisterSchema),
  authController.register,
);
authRoutes.post("/login", zodValidation(LoginSchema), authController.login);
authRoutes.post("/logout", refreshToken, authController.logout);
authRoutes.post("/refresh", refreshToken, authController.refresh);
authRoutes.get("/me", authenticate, authController.me);
