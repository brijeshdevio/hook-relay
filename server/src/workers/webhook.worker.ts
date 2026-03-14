import { Worker } from "bullmq";
import { env } from "../config";
import { deliveryService } from "../services/delivery.service";

new Worker(
  "webhook",
  async (job) => {
    await deliveryService.process(job.data);
  },
  {
    connection: {
      url: env.REDIS_URL,
    },
  },
);
