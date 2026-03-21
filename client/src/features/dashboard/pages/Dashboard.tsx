import {
  Plus,
  TrendingUp, TrendingDown
} from "lucide-react";
import { NewEndpoint } from "../components/NewEndpoint";
import { CardEndpoint } from "../components/CardEndpoint";
import { useGetAllEndpoints } from "../dashboard.hooks";
import { Loader } from "@/shared/ui";

const OVERVIEW_STATS = [
  { title: "Total Endpoints", value: "12", trend: "up", percent: "2%" },
  { title: "Total Requests", value: "1.2k", trend: "up", percent: "15%" },
  { title: "Delivered", value: "1,150", trend: "down", percent: "1%", accent: "border-l-[4px] border-l-success" },
  { title: "Failed", value: "50", trend: "down", percent: "5%", accent: "border-l-[4px] border-l-error", isGoodTrend: true },
];

function Endpoints() {
  const { data, isPending, isError, error } = useGetAllEndpoints();
  if (isPending) return <Loader className="h-64" />

  if (isError) return <div className="text-center text-error">Error: {error?.message}</div>;

  return (
    <>
      {data.map((endpoint: CardEndpoint) => (
        <CardEndpoint key={endpoint.id} {...endpoint} />
      ))}
    </>
  );
}


export default function Dashboard() {
  return (
    <div className="flex h-screen bg-base-200 text-base-content font-sans selection:bg-primary/30">


      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto">

          {/* Header Row */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-base-content">Dashboard</h1>
              <p className="text-[15px] text-base-content/60 font-medium">Manage and monitor your incoming webhook relays</p>
            </div>
            <NewEndpoint />
          </header>

          {/* Top Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {OVERVIEW_STATS.map((stat, idx) => {
              const BadgeIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
              const badgeBg = stat.trend === "up" || stat.isGoodTrend ? "bg-success/10 text-success" : "bg-error/10 text-error";
              const valueColor = stat.title === "Failed" ? "text-error" : "text-base-content";

              return (
                <div key={idx} className={`bg-base-100 rounded-[14px] p-5 shadow-sm border border-base-content/5 relative overflow-hidden ${stat.accent || ""}`}>
                  <h3 className="text-[13px] font-semibold text-base-content/60 mb-2">{stat.title}</h3>
                  <div className="flex items-end justify-between">
                    <span className={`text-[1.75rem] font-extrabold leading-none ${valueColor}`}>{stat.value}</span>
                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[11px] font-extrabold tracking-wide ${badgeBg}`}>
                      <BadgeIcon className="w-3 h-3 stroke-[3]" />
                      {stat.percent}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Relays Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Endpoints />
            {/* Create New Relay Card */}
            <button className="bg-base-200/30 rounded-[20px] border-2 border-dashed border-base-content/10 hover:border-primary/30 hover:bg-base-200/50 transition-all flex flex-col items-center justify-center p-8 min-h-[380px] group cursor-pointer text-center">
              <div className="w-14 h-14 rounded-full bg-base-100 shadow-sm border border-base-content/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                <Plus className="w-6 h-6 text-base-content/40 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-[17px] font-bold text-base-content mb-2 group-hover:text-primary transition-colors">Create New Relay</h3>
              <p className="text-[14px] text-base-content/50 font-medium">Connect a new service to monitor payloads</p>
            </button>

          </div>
        </div>
      </main>
    </div>
  );
}
