import { serve } from "@hono/node-server";
import app from "./app";
import { env } from "./config";

if (env.NODE_ENV === "development") {
  serve({
    fetch: app.fetch,
    port: env.PORT,
  });

  console.log(`Listening on http://localhost:${env.PORT}`);
}
