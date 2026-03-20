import { useQuery } from "@tanstack/react-query";
import { transform } from "@/utils/transform";
import { UserServices } from "./user.services";

export const useMe = () =>
    useQuery({
        queryKey: ["me"],
        queryFn: UserServices.me,
        retry: 0,
        staleTime: Infinity,
        select: transform,
    });
