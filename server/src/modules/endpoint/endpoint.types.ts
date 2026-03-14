import z from "zod";
import { CreateEndpointSchema, UpdateEndpointSchema } from "./endpoint.schema";

export type CreateEndpointDto = z.infer<typeof CreateEndpointSchema>;
export type UpdateEndpointDto = z.infer<typeof UpdateEndpointSchema>;
