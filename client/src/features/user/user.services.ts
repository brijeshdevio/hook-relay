import { axiosClient } from "@/lib/axios";

export const UserServices = {
    me: () => axiosClient.get("/auth/me").then((res) => res.data),
};
