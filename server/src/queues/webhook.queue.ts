import { Queue } from "bullmq";
import { env } from "../config";

export const webhookQueue = new Queue("webhook", {
  connection: {
    url: env.REDIS_URL,
  },
});
