import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DashboardServices } from "./dashboard.services";
import { notifyError, notifySuccess } from "@/utils/notify";
import { useForm } from "react-hook-form";
import { CreateEndpointSchema, type CreateEndpointDto } from "./dashboard.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCreateEndpoint = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["create-endpoint"],
        mutationFn: DashboardServices.create,
        onSuccess: (data) => {
            notifySuccess(data?.message || "Endpoint created!"),
                queryClient.invalidateQueries({ queryKey: ["get-endpoints"] })
        },
        onError: (error: unknown) => notifyError(error),
    })
}

export const useCreateEndpointFacade = () => {
    const { mutate, isPending } = useCreateEndpoint();


    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<CreateEndpointDto>({
        resolver: zodResolver(CreateEndpointSchema),
    });

    function submit(data: CreateEndpointDto) {
        mutate(data);
    }

    return { submit, isPending, register, handleSubmit, errors };
};

export const useGetAllEndpoints = () =>
    useQuery({
        queryKey: ["get-endpoints"],
        queryFn: DashboardServices.getAll,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
