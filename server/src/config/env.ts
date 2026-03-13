import "dotenv/config";

export const env = {
  PORT: parseInt(process.env.PORT!, 10) || 8787,
  NODE_ENV: process.env.NODE_ENV!,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
};
