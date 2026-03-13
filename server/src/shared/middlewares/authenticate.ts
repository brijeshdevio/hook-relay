import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "../../constants";
import { UnauthorizedException } from "../../shared/errors";
import { env } from "../../config";

export async function authenticate(c: Context, next: Next) {
  const accessToken = getCookie(c, COOKIE_NAME.ACCESS_TOKEN);

  if (!accessToken) {
    throw new UnauthorizedException();
  }

  try {
    const payload = jwt.verify(accessToken, env.JWT_SECRET) as { sub: string };

    c.set("user", {
      sub: payload.sub,
    });
  } catch {
    throw new UnauthorizedException();
  }

  await next();
}
