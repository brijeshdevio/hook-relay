import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { COOKIE_NAME } from "../../constants";
import { UnauthorizedException } from "../../shared/errors";

export async function refreshToken(c: Context, next: Next) {
  const refreshToken = getCookie(c, COOKIE_NAME.REFRESH_TOKEN);

  if (!refreshToken) {
    throw new UnauthorizedException();
  }

  try {
    c.set("user", {
      refreshToken,
    });
  } catch {
    throw new UnauthorizedException();
  }

  await next();
}
