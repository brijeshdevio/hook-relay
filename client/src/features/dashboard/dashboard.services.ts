import { axiosClient } from "@/lib/axios";
import type { CreateEndpointDto } from "./dashboard.schema";

export const DashboardServices = {
  create: (data: CreateEndpointDto) =>
    axiosClient.post("/endpoints", data).then((res) => res.data),
  getAll: () => axiosClient.get("/endpoints").then((res) => res.data),
  getOne: (id: string) =>
    axiosClient.get(`/endpoints/${id}`).then((res) => res.data),
  getAllRequests: (id: string) =>
    axiosClient.get(`/${id}/requests`).then((res) => res.data),
};
