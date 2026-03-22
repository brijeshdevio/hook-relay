import {
  Pencil,
  Copy,
  ExternalLink,
  RefreshCw,
  ChevronRight,
  Link as LinkIcon,
} from "lucide-react";
import { Button, Loader } from "@/shared/ui";
import { Link, useParams } from "react-router-dom";
import { useGetAllRequests, useGetEndpoint } from "../dashboard.hooks";
import { formatTime } from "@/utils/formatTime";

function EndpointDetails() {
  const { endpointId } = useParams();
  const { data, isPending, isError, error } = useGetEndpoint(endpointId!);
  if (isPending) return <Loader />;

  if (isError)
    return (
      <div className="text-error text-center">Error: {error?.message}</div>
    );

  return (
    <>
      {/* Breadcrumb Header */}
      <div className="text-base-content/50 mb-3 flex items-center gap-2 text-[14px] font-semibold">
        <Link
          to="/dashboard"
          className="hover:text-base-content transition-colors"
        >
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-base-content">{data?.name}</span>
      </div>
      <div className="bg-base-100 border-base-content/10 rounded-[20px] border p-6 shadow-sm lg:p-8">
        {/* Header Area */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary border-primary/20 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border">
              <LinkIcon className="h-6 w-6" />
            </div>
            <div>
              <div className="mb-1 flex items-center gap-3">
                <h1 className="text-base-content text-2xl font-bold tracking-tight">
                  {data?.name}
                </h1>
                <div className="badge badge-success badge-sm bg-success/15 text-success border-none px-3 py-2.5 text-[10px] font-bold tracking-wider uppercase">
                  {data?.isActive ? "Active" : "Inactive"}
                </div>
              </div>
              <div className="text-base-content/60 text-[14px] font-medium">
                Status: <span className="text-success font-bold">Healthy</span>
              </div>
            </div>
          </div>
          <Button className="btn-outline border-base-content/20 hover:bg-base-200 hover:border-base-content/30 text-base-content flex h-10 shrink-0 items-center gap-2 !rounded-xl px-5 text-[14px] font-bold shadow-sm">
            <Pencil className="h-4 w-4" />
            Edit Endpoint
          </Button>
        </div>

        {/* URLs Area */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-base-content/40 mb-2 block text-[11px] font-bold tracking-widest uppercase">
              Listen URL
            </label>
            <div className="bg-base-200/50 border-base-content/10 group flex items-center rounded-xl border p-3">
              <code className="text-error flex-1 truncate font-mono text-[14px]">
                {data?.listenUrl}
              </code>
              <button className="text-base-content/30 group-hover:text-base-content/70 ml-2 p-1 transition-colors">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div>
            <label className="text-base-content/40 mb-2 block text-[11px] font-bold tracking-widest uppercase">
              Forward URL
            </label>
            <div className="bg-base-200/50 border-base-content/10 group flex items-center rounded-xl border p-3">
              <code className="text-base-content/70 flex-1 truncate font-mono text-[14px]">
                {data?.forwardUrl}
              </code>
              <button className="text-base-content/30 group-hover:text-base-content/70 ml-2 p-1 transition-colors">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Area */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="bg-base-200/50 border-base-content/5 rounded-[14px] border p-5">
            <h3 className="text-base-content/50 mb-1 text-[12px] font-bold">
              Created
            </h3>
            <div className="text-base-content text-[18px] font-extrabold">
              {formatTime(data?.createdAt || 0)}
            </div>
          </div>
          <div className="bg-base-200/50 border-base-content/5 rounded-[14px] border p-5">
            <h3 className="text-base-content/50 mb-1 text-[12px] font-bold">
              Total Requests
            </h3>
            <div className="text-base-content mb-1 text-[18px] font-extrabold">
              {data?.totalReceived}
            </div>
            <div className="text-success text-[11px] font-bold">+5.2%</div>
          </div>
          <div className="bg-base-200/50 border-base-content/5 rounded-[14px] border p-5">
            <h3 className="text-base-content/50 mb-1 text-[12px] font-bold">
              Delivered
            </h3>
            <div className="text-base-content mb-1 text-[18px] font-extrabold">
              {data?.totalDelivered}
            </div>
            <div className="text-warning text-[11px] font-bold">94.8% RATE</div>
          </div>
          <div className="bg-base-200/50 border-base-content/5 rounded-[14px] border p-5">
            <h3 className="text-base-content/50 mb-1 text-[12px] font-bold">
              Failed
            </h3>
            <div className="text-base-content mb-1 text-[18px] font-extrabold">
              {data?.totalFailed}
            </div>
            <div className="text-error text-[11px] font-bold">5.2% ERRORS</div>
          </div>
        </div>
      </div>
    </>
  );
}

type Request = {
  id: string;
  receivedAt: string;
  responseStatus: number;
  responseTimeMs: number;
  sourceIp: string;
  deliveryStatus: string;
};

function Requests() {
  const { endpointId } = useParams();
  const { data, isPending, isError, error } = useGetAllRequests(endpointId!);

  if (isPending) return <Loader />;

  if (isError)
    return (
      <div className="text-error text-center">Error: {error?.message}</div>
    );

  return (
    <div className="mt-2 flex flex-col gap-4">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-base-content text-xl font-bold">Requests</h2>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="join bg-base-100 border-base-content/10 rounded-xl border p-1 shadow-sm">
            {["All", "Delivered", "Failed", "Pending"].map((tab, idx) => (
              <button
                key={tab}
                className={`join-item btn btn-sm border-none bg-transparent px-4 text-[13px] font-semibold capitalize shadow-none ${
                  idx === 0
                    ? "bg-base-200/80 text-base-content hover:bg-base-300 rounded-lg"
                    : "text-base-content/60 hover:bg-base-200/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <Button className="btn-square bg-base-100 border-base-content/10 hover:bg-base-200 h-10 w-10 shrink-0 !rounded-xl border shadow-sm">
            <RefreshCw className="text-base-content/60 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-base-100 border-base-content/10 overflow-hidden rounded-[20px] border shadow-sm">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-base-200/30 text-base-content/50 text-[11px] font-extrabold tracking-widest uppercase">
              <tr>
                <th className="py-4">Method</th>
                <th className="py-4 text-left">Received At</th>
                <th className="py-4">Status</th>
                <th className="py-4 text-center">Code</th>
                <th className="py-4 text-right">Time</th>
                <th className="py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-base-content/80 text-[14px] font-medium">
              {data?.map((req: Request) => (
                <tr
                  key={req.id}
                  className="hover:bg-base-200/20 border-base-content/5 border-b text-center"
                >
                  <td>
                    <div className="bg-primary/10 text-primary inline-flex rounded-[6px] px-2.5 py-1 text-[11px] font-extrabold tracking-wider uppercase">
                      {"POST"}
                    </div>
                  </td>
                  <td className="py-4 text-left">
                    <div className="text-base-content text-[13px] font-semibold">
                      {formatTime(req.receivedAt)}
                    </div>
                    <div className="text-base-content/40 mt-0.5 font-mono text-[11px]">
                      {formatTime(req.receivedAt, true)}
                    </div>
                  </td>
                  <td>
                    <div className="text-base-content lower inline-flex items-center justify-center gap-2 text-[13px] font-bold">
                      <span
                        className={`h-2 w-2 rounded-full ${req.responseStatus < 400 ? "bg-success" : "bg-error"} `}
                      ></span>
                      <span className="capitalize">
                        {req?.deliveryStatus[0]}
                        {req?.deliveryStatus?.slice(1).toLocaleLowerCase()}
                      </span>
                    </div>
                  </td>
                  <td className={`font-mono text-[12px] font-bold opacity-90`}>
                    {req.responseStatus}
                  </td>
                  <td className="text-right">
                    <span className="font-mono text-[13px] opacity-70">
                      {req.responseTimeMs}ms
                    </span>
                  </td>
                  <td>
                    <Link to={`/webhooks/${req.id}`}>
                      <Button className="btn-ghost btn-xs text-primary hover:text-primary hover:bg-primary/10 px-3 text-[12px] font-bold">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="mt-2 mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-base-content/50 text-[13px] font-semibold">
          Showing 1 to 10 of 48 entries
        </div>
        <div className="join border-base-content/10 bg-base-100 overflow-hidden rounded-xl border shadow-sm">
          <button className="join-item btn btn-sm bg-base-100 hover:bg-base-200 text-base-content/70 border-none px-4 font-bold capitalize">
            Previous
          </button>
          <button className="join-item btn btn-sm bg-primary text-primary-content hover:bg-primary border-none px-4 font-bold">
            1
          </button>
          <button className="join-item btn btn-sm bg-base-100 hover:bg-base-200 text-base-content/70 border-none px-4 font-bold">
            2
          </button>
          <button className="join-item btn btn-sm bg-base-100 hover:bg-base-200 text-base-content/70 border-none px-4 font-bold">
            3
          </button>
          <button className="join-item btn btn-sm bg-base-100 hover:bg-base-200 text-base-content/70 border-none px-4 font-bold capitalize">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Endpoint() {
  return (
    <div className="bg-base-200 text-base-content selection:bg-primary/30 flex h-screen font-sans">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
        <div className="mx-auto max-w-6xl">
          {/* Main Endpoint Card */}
          <EndpointDetails />
          {/* Requests Section */}
          <Requests />
        </div>
      </main>
    </div>
  );
}
