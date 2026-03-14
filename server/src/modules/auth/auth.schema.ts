import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(6).max(30),
  })
  .strict();

export const LoginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(30),
  })
  .strict();
