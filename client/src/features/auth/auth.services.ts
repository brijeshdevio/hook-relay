import { axiosClient } from "@/lib/axios";

export const AuthServices = {
    register: (data: any) =>
        axiosClient.post("/auth/register", data).then((res) => res.data),
    login: (data: any) =>
        axiosClient.post("/auth/login", data).then((res) => res.data),
    logout: () => axiosClient.post("/auth/logout").then((res) => res.data),
};
