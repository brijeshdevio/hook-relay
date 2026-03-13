import { Context, Next } from "hono";
import { Schema } from "zod";

type Source = "json" | "param" | "query";

export const zodValidation =
  (schema: Schema, source: Source = "json") =>
  async (c: Context, next: Next) => {
    try {
      let data: unknown;

      if (source === "json") data = await c.req.json();
      if (source === "param") data = c.req.param();
      if (source === "query") data = c.req.query();

      await schema.parseAsync(data);

      await next();
    } catch (err) {
      return c.json({ error: err }, 400);
    }
  };
