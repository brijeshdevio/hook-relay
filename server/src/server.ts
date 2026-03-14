import { serve } from "@hono/node-server";
import app from "./app";
import { env } from "./config";

if (env.NODE_ENV === "development") {
  serve({
    fetch: app.fetch,
    port: parseInt(env.PORT, 10) || 3000,
  });
  console.log(`Server running at http://localhost:${env.PORT}`);
}
