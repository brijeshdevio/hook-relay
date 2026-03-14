import { Hono } from "hono";
import { EndpointController } from "./endpoint.controller";
import { EndpointService } from "./endpoint.service";
import { authMiddleware } from "../../common/middleware";
import { zodValidator } from "../../common/validators";
import { CreateEndpointSchema, UpdateEndpointSchema } from "./endpoint.schema";

export const endpointRoutes = new Hono();
const controller = new EndpointController(new EndpointService());

endpointRoutes.post(
  "/",
  authMiddleware,
  zodValidator(CreateEndpointSchema),
  controller.create,
);
endpointRoutes.get("/", authMiddleware, controller.findAll);
endpointRoutes.get("/:id", authMiddleware, controller.findOne);
endpointRoutes.patch(
  "/:id",
  authMiddleware,
  zodValidator(UpdateEndpointSchema),
  controller.update,
);
endpointRoutes.delete("/:id", authMiddleware, controller.delete);
