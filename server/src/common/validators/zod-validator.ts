import { Schema } from "zod";
import { Context, Next } from "hono";

type Source = "body" | "params" | "query";

export const zodValidator =
  (schema: Schema, source: Source = "body") =>
  async (c: Context, next: Next) => {
    let data: unknown;

    switch (source) {
      case "body":
        data = await c.req.json();
        break;
      case "params":
        data = c.req.param();
        break;
      case "query":
        data = c.req.query();
        break;
    }

    await schema.parseAsync(data);

    await next();
  };
