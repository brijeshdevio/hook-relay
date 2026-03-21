import { Button } from "@/shared/ui";
import { Copy, MoreVertical, Pencil } from "lucide-react";

export type CardEndpoint = {
    id: string;
    name: string;
    listenUrl: string;
    forwardUrl: string;
    isActive: boolean;
    totalReceived: number;
    totalDelivered: number;
    totalFailed: number;
    lastReceivedAt: string
    slug: string;
}

const apiURL = import.meta.env.VITE_API_URL;
export function CardEndpoint(props: CardEndpoint) {
    return <div className="bg-base-100 rounded-[20px] p-6 shadow-sm border border-base-content/5 flex flex-col hover:border-base-content/10 transition-colors">
        <div className="flex justify-between items-start mb-6">
            <div>
                <h3 className="text-[17px] font-bold text-base-content mb-2">{props.name}
                </h3>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-error `}></span>
                    {props.isActive ? "Active" : "Inactive"}
                </div>
            </div>
            <div className="flex items-center gap-2 text-base-content/40">
                <button className="hover:text-base-content transition-colors p-1"><Pencil className="w-4 h-4" /></button>
                <button className="hover:text-base-content transition-colors p-1"><MoreVertical className="w-5 h-5" /></button>
            </div>
        </div>

        <div className="space-y-4 mb-8 flex-1">
            <div>
                <label className="text-[10px] font-extrabold text-base-content/40 uppercase tracking-widest mb-1.5 block">Listen URL</label>
                <div className="flex items-center bg-base-200/50 rounded-[10px] p-3 border border-base-content/5 group">
                    <code className="text-[13px] text-error flex-1 truncate font-mono">{props.listenUrl}</code>
                    <button className="text-base-content/30 group-hover:text-base-content/70 transition-colors ml-2">
                        <Copy className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div>
                <label className="text-[10px] font-extrabold text-base-content/40 uppercase tracking-widest mb-1.5 block">Forwards To</label>
                <div className="bg-base-200/30 rounded-[10px] p-3 border border-base-content/10 border-dashed">
                    <code className="text-[13px] text-base-content/70 truncate block font-mono">{props.forwardUrl}</code>
                </div>
            </div>

            <div>
                <label className="text-[10px] font-extrabold text-base-content/40 uppercase tracking-widest mb-1.5 block">URL</label>
                <div className="flex items-center bg-base-200/50 rounded-[10px] p-3 border border-base-content/5 group">
                    <code className="text-[13px] text-error flex-1 truncate font-mono">{apiURL}/in/{props.slug}</code>
                    <button className="text-base-content/30 group-hover:text-base-content/70 transition-colors ml-2">
                        <Copy className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-8">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-extrabold text-base-content/40 uppercase tracking-widest">Requests</span>
                    <span className="text-[15px] font-bold text-base-content">{props.totalReceived || 0}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-extrabold text-base-content/40 uppercase tracking-widest">Success</span>
                    <span className="text-[15px] font-bold text-success">{props.totalDelivered || 0}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-extrabold text-base-content/40 uppercase tracking-widest">Failed</span>
                    <span className="text-[15px] font-bold text-error">{props.totalFailed || 0}</span>
                </div>
            </div>
            <Button className="btn btn-sm">
                View Details
            </Button>
        </div>
    </div>
}