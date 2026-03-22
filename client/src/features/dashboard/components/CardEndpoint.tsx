import { Button } from "@/shared/ui";
import { Copy, MoreVertical, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export type CardEndpoint = {
  id: string;
  name: string;
  listenUrl: string;
  forwardUrl: string;
  isActive: boolean;
  totalReceived: number;
  totalDelivered: number;
  totalFailed: number;
  lastReceivedAt: string;
  slug: string;
};

const apiURL = import.meta.env.VITE_API_URL;
export function CardEndpoint(props: CardEndpoint) {
  return (
    <div className="bg-base-100 border-base-content/5 hover:border-base-content/10 flex flex-col rounded-[20px] border p-6 shadow-sm transition-colors">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-base-content mb-2 text-[17px] font-bold">
            {props.name}
          </h3>
          <div
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase`}
          >
            <span className={`bg-error h-1.5 w-1.5 rounded-full`}></span>
            {props.isActive ? "Active" : "Inactive"}
          </div>
        </div>
        <div className="text-base-content/40 flex items-center gap-2">
          <button className="hover:text-base-content p-1 transition-colors">
            <Pencil className="h-4 w-4" />
          </button>
          <button className="hover:text-base-content p-1 transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mb-8 flex-1 space-y-4">
        <div>
          <label className="text-base-content/40 mb-1.5 block text-[10px] font-extrabold tracking-widest uppercase">
            Listen URL
          </label>
          <div className="bg-base-200/50 border-base-content/5 group flex items-center rounded-[10px] border p-3">
            <code className="text-error flex-1 truncate font-mono text-[13px]">
              {props.listenUrl}
            </code>
            <button className="text-base-content/30 group-hover:text-base-content/70 ml-2 transition-colors">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div>
          <label className="text-base-content/40 mb-1.5 block text-[10px] font-extrabold tracking-widest uppercase">
            Forwards To
          </label>
          <div className="bg-base-200/30 border-base-content/10 rounded-[10px] border border-dashed p-3">
            <code className="text-base-content/70 block truncate font-mono text-[13px]">
              {props.forwardUrl}
            </code>
          </div>
        </div>

        <div>
          <label className="text-base-content/40 mb-1.5 block text-[10px] font-extrabold tracking-widest uppercase">
            URL
          </label>
          <div className="bg-base-200/50 border-base-content/5 group flex items-center rounded-[10px] border p-3">
            <code className="text-error flex-1 truncate font-mono text-[13px]">
              {apiURL}/in/{props.slug}
            </code>
            <button className="text-base-content/30 group-hover:text-base-content/70 ml-2 transition-colors">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-base-content/40 text-[10px] font-extrabold tracking-widest uppercase">
              Requests
            </span>
            <span className="text-base-content text-[15px] font-bold">
              {props.totalReceived || 0}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base-content/40 text-[10px] font-extrabold tracking-widest uppercase">
              Success
            </span>
            <span className="text-success text-[15px] font-bold">
              {props.totalDelivered || 0}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base-content/40 text-[10px] font-extrabold tracking-widest uppercase">
              Failed
            </span>
            <span className="text-error text-[15px] font-bold">
              {props.totalFailed || 0}
            </span>
          </div>
        </div>
        <Link to={`/endpoints/${props.id}`}>
          <Button className="btn btn-sm">View Details</Button>
        </Link>
      </div>
    </div>
  );
}
