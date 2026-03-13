import { Hono } from "hono";
import { EndpointsController } from "./endpoints.controller";
import { EndpointsService } from "./endpoints.service";
import { authenticate, zodValidation } from "../../shared/middlewares";
import { CreateEndpointSchema } from "./endpoints.schema";

export const endpointsRoutes = new Hono();

const endpointsController = new EndpointsController(new EndpointsService());

endpointsRoutes.post(
  "/",
  authenticate,
  zodValidation(CreateEndpointSchema),
  endpointsController.create,
);
endpointsRoutes.get("/", authenticate, endpointsController.findMany);
endpointsRoutes.delete("/:endId", authenticate, endpointsController.delete);
endpointsRoutes.get(
  "/:endId/requests",
  authenticate,
  endpointsController.findManyRequest,
);
endpointsRoutes.get(
  "/:endId/requests/:reqId",
  authenticate,
  endpointsController.findOneRequest,
);
endpointsRoutes.post(
  "/:endId/requests/:reqId/reply",
  authenticate,
  endpointsController.replyRequest,
);
