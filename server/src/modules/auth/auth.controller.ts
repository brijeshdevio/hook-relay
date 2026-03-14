import { Context } from "hono";
import { setCookie, deleteCookie, getCookie } from "hono/cookie";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./auth.types";
import { env } from "../../config";
import { CookieOptions } from "hono/utils/cookie";

const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";

const sameSite: CookieOptions["sameSite"] =
  env.NODE_ENV === "development" ? "lax" : "none";
const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite,
};

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (c: Context) => {
    const body = await c.req.json<RegisterDto>();
    const user = await this.authService.register(body);
    return c.json(user, 201);
  };

  login = async (c: Context) => {
    const body = await c.req.json<LoginDto>();
    const { accessToken, refreshToken } = await this.authService.login(body);
    setCookie(c, ACCESS_COOKIE, accessToken, {
      ...cookieOptions,
      maxAge: 60 * 15, // 15 minutes
    });
    setCookie(c, REFRESH_COOKIE, refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return c.json({ success: true });
  };

  logout = async (c: Context) => {
    const refreshToken = getCookie(c, REFRESH_COOKIE);

    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    deleteCookie(c, ACCESS_COOKIE);
    deleteCookie(c, REFRESH_COOKIE);

    return c.json({ success: true });
  };

  refresh = async (c: Context) => {
    const refreshToken = getCookie(c, REFRESH_COOKIE);

    if (!refreshToken) {
      return c.json({ message: "Missing refresh token" }, 401);
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refresh(refreshToken);

    setCookie(c, ACCESS_COOKIE, accessToken, {
      ...cookieOptions,
      maxAge: 60 * 15,
    });

    setCookie(c, REFRESH_COOKIE, newRefreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 7,
    });

    return c.json({ success: true });
  };

  me = async (c: Context) => {
    const userId = c.get("user")?.id;
    const user = await this.authService.me(userId);
    return c.json(user);
  };
}
