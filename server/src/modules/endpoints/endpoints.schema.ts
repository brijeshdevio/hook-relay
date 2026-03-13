import z from "zod";

export const CreateEndpointSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(100, "Description must be at most 100 characters")
    .optional(),
  listenUrl: z.string().url("Listen URL must be a valid URL"),
  forwardUrl: z.string().url("Forward URL must be a valid URL"),
});
