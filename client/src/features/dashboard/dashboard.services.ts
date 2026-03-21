import { axiosClient } from "@/lib/axios";

export const DashboardServices = {
    create: (data: any) => axiosClient.post("/endpoints", data).then(res => res.data),
    getAll: () => axiosClient.get("/endpoints").then(res => res.data),
}