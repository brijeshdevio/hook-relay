import { Context } from "hono";
import { EndpointService } from "./endpoint.service";
import { CreateEndpointDto } from "./endpoint.types";

export class EndpointController {
  constructor(private readonly endpointService: EndpointService) {}

  create = async (c: Context) => {
    const userId = c.get("user")?.id;
    const body = await c.req.json<CreateEndpointDto>();
    const res = await this.endpointService.create(userId, body);
    return c.json(res, 201);
  };

  findAll = async (c: Context) => {
    const userId = c.get("user")?.id;
    const res = await this.endpointService.findAll(userId);
    return c.json(res);
  };

  findOne = async (c: Context) => {
    const userId = c.get("user")?.id;
    const id = c.req.param("id") as string;
    const res = await this.endpointService.findOne(userId, id);
    return c.json(res);
  };

  update = async (c: Context) => {
    const userId = c.get("user")?.id;
    const id = c.req.param("id") as string;
    const body = await c.req.json<CreateEndpointDto>();
    const res = await this.endpointService.update(userId, id, body);
    return c.json(res);
  };

  delete = async (c: Context) => {
    const userId = c.get("user")?.id;
    const id = c.req.param("id") as string;
    await this.endpointService.delete(userId, id);
    return c.json({ success: true });
  };
}
