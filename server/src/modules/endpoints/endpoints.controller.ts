import { Context } from "hono";
import { EndpointsService } from "./endpoints.service";

export class EndpointsController {
  constructor(private readonly endpointsService: EndpointsService) {}

  create = async (c: Context) => {
    const userId = c.get("user")?.sub;
    const data = await c.req.json();
    const res = await this.endpointsService.create(userId, data);
    return c.json(res);
  };

  findMany = async (c: Context) => {
    const userId = c.get("user")?.sub;
    const res = await this.endpointsService.findMany(userId);
    return c.json(res);
  };

  delete = async (c: Context) => {
    const userId = c.get("user")?.sub;
    const endId = c.req.param("endId") as string;
    await this.endpointsService.delete(userId, endId);
    return c.json({ success: true });
  };

  findManyRequest = async (c: Context) => {
    const userId = c.get("user")?.sub;
    const endId = c.req.param("id") as string;
    const res = await this.endpointsService.findManyRequest(userId, endId);
    return c.json(res);
  };

  findOneRequest = async (c: Context) => {
    const userId = c.get("user")?.sub;
    const { endId, reqId } = c.req.param() as {
      endId: string;
      reqId: string;
    };
    const res = await this.endpointsService.findOneRequest(userId, {
      endId,
      reqId,
    });
    return c.json(res);
  };

  replyRequest = async (c: Context) => {
    const userId = c.get("user")?.sub;
    const { endId, reqId } = c.req.param() as {
      endId: string;
      reqId: string;
    };
    await this.endpointsService.replyRequest(userId, { endId, reqId });
    return c.json({ success: true });
  };
}
