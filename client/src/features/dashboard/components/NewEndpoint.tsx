import { Button, Input, Textarea } from "@/shared/ui";
import { Plus, X } from "lucide-react";
import { memo } from "react";
import { useCreateEndpointFacade } from "../dashboard.hooks";

export const NewEndpoint = memo(() => {
    const { handleSubmit, submit, isPending, register, errors } = useCreateEndpointFacade()
    return <>
        <label htmlFor="my_modal_6" className="btn btn-primary px-6 shadow-sm flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Endpoint
        </label>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
            <div className="modal-box bg-base-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-md font-medium">Create New Endpoint</h2>
                    <label htmlFor="my_modal_6" className="btn btn-circle btn-sm">
                        <X className="w-4 h-4" />
                    </label>
                </div>
                <form className="mt-2 space-y-3" onSubmit={handleSubmit(submit)}>
                    <Input
                        label="Endpoint Name"
                        placeholder="e.g. Stripe Production"
                        error={errors.name}
                        {...register("name")}
                    />
                    <Input
                        label="Forward URL"
                        type="url"
                        error={errors.forwardUrl}
                        {...register("forwardUrl")}
                        placeholder="e.g. https://api.myapp.com/v1/billing/stripe"
                    />
                    <Input
                        label="Listen URL"
                        type="url"
                        error={errors.listenUrl}
                        {...register("listenUrl")}
                        placeholder="e.g. https://api.webhookmonitor.com/wh/stripe_prod"
                    />
                    <Textarea
                        label="Description (Optional)"
                        placeholder="What is the endpoint for?"
                        error={errors.description}
                        {...register("description")}
                    />
                    <Button type="submit" className="btn-primary w-full mt-2"
                        isLoading={isPending}
                    >
                        Create Endpoint
                    </Button>
                </form>
            </div>
        </div>
    </>
})