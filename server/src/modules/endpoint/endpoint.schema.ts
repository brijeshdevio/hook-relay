import z from "zod";

export const CreateEndpointSchema = z
  .object({
    name: z.string().min(3).max(30),
    description: z.string().max(100).optional(),
    listenUrl: z.string().url(),
    forwardUrl: z.string().url(),
  })
  .strict();

export const UpdateEndpointSchema = z
  .object({
    name: z.string().min(3).max(30).optional(),
    description: z.string().max(100).optional(),
  })
  .refine(
    (data) => {
      return Object.keys(data).length > 0;
    },
    {
      message: "At least one field must be provided",
    },
  )
  .strict();
