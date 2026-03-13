import z from "zod";
import { CreateEndpointSchema } from "./endpoints.schema";

// ================ DTOs =================

export type CreateEndpointDto = z.infer<typeof CreateEndpointSchema>;
