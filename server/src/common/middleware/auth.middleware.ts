// middleware/authenticate.ts

import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { UnauthorizedException } from "../errors";
import { verifyJwt } from "../utils";

const ACCESS_COOKIE = "access_token";

interface AccessPayload {
  sub: string;
  type: "access";
}

export const authMiddleware = async (c: Context, next: Next) => {
  const token = getCookie(c, ACCESS_COOKIE);

  if (!token) {
    throw new UnauthorizedException("Authentication required");
  }

  try {
    const payload = verifyJwt<AccessPayload>(token);

    if (payload.type !== "access") {
      throw new UnauthorizedException("Invalid token type");
    }

    // attach user to context
    c.set("user", {
      id: payload.sub,
    });

    await next();
  } catch {
    throw new UnauthorizedException("Invalid or expired token");
  }
};
