import { Context } from "hono";
import { AuthService } from "./auth.service";
import { setCookie } from "hono/cookie";
import { COOKIE_EXPIRES, COOKIE_NAME } from "../../constants";
import { Variables } from "../../types/hono";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (c: Context) => {
    const res = await this.authService.register(await c.req.json());
    return c.json(res);
  };

  login = async (c: Context) => {
    const res = await this.authService.login(await c.req.json());
    setCookie(c, COOKIE_NAME.ACCESS_TOKEN, res.accessToken, {
      maxAge: COOKIE_EXPIRES.ACCESS_TOKEN,
    });
    setCookie(c, COOKIE_NAME.REFRESH_TOKEN, res.refreshToken, {
      maxAge: COOKIE_EXPIRES.REFRESH_TOKEN,
    });
    return c.json({ success: true });
  };

  logout = async (c: Context<{ Variables: Variables }>) => {
    const user = c.get("user");
    await this.authService.logout(user?.refreshToken);
    setCookie(c, COOKIE_NAME.ACCESS_TOKEN, "", {
      maxAge: 0,
    });
    setCookie(c, COOKIE_NAME.REFRESH_TOKEN, "", {
      maxAge: 0,
    });
    return c.json({ success: true });
  };

  refresh = async (c: Context<{ Variables: Variables }>) => {
    const user = c.get("user");
    const res = await this.authService.refresh(user?.refreshToken);
    setCookie(c, COOKIE_NAME.ACCESS_TOKEN, res.accessToken, {
      maxAge: COOKIE_EXPIRES.ACCESS_TOKEN,
    });
    setCookie(c, COOKIE_NAME.REFRESH_TOKEN, res.refreshToken, {
      maxAge: COOKIE_EXPIRES.REFRESH_TOKEN,
    });
    return c.json({ success: true });
  };

  me = async (c: Context<{ Variables: Variables }>) => {
    const user = c.get("user");
    const res = await this.authService.me(user?.sub);
    return c.json(res);
  };
}
