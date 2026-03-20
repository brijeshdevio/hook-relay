import {
  Plus, Pencil, MoreVertical, Copy,
  TrendingUp, TrendingDown
} from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { NewEndpoint } from "../components/NewEndpoint";

const OVERVIEW_STATS = [
  { title: "Total Endpoints", value: "12", trend: "up", percent: "2%" },
  { title: "Total Requests", value: "1.2k", trend: "up", percent: "15%" },
  { title: "Delivered", value: "1,150", trend: "down", percent: "1%", accent: "border-l-[4px] border-l-success" },
  { title: "Failed", value: "50", trend: "down", percent: "5%", accent: "border-l-[4px] border-l-error", isGoodTrend: true },
];

const RELAYS = [
  {
    name: "Stripe Payments",
    status: "Active",
    statusColor: "bg-success/20 text-success",
    dotColor: "bg-success",
    listenUrl: "https://api.webhookmonitor.com/wh/stripe_prod...",
    forwardsTo: "https://api.myapp.com/v1/billing/stripe",
    requests: "842",
    success: "838",
    failed: "4",
  },
  {
    name: "GitHub Events",
    status: "Paused",
    statusColor: "bg-warning/20 text-warning-content",
    dotColor: "bg-warning",
    listenUrl: "https://api.webhookmonitor.com/wh/gh_events_01...",
    forwardsTo: "https://workflow.internal.dev/github-relay",
    requests: "15.2k",
    success: "14.9k",
    failed: "312",
  },
  {
    name: "Shopify Sync",
    status: "Critical Error",
    statusColor: "bg-error/20 text-error",
    dotColor: "bg-error",
    listenUrl: "https://api.webhookmonitor.com/wh/shopify_sto...",
    forwardsTo: "https://webhooks.shopify-app.io/receive",
    requests: "--",
    success: "--",
    failed: "--",
  },
];

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

            {/* Existing Relays */}
            {RELAYS.map((relay, idx) => (
              <div key={idx} className="bg-base-100 rounded-[20px] p-6 shadow-sm border border-base-content/5 flex flex-col hover:border-base-content/10 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-[17px] font-bold text-base-content mb-2">{relay.name}</h3>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${relay.statusColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${relay.dotColor}`}></span>
                      {relay.status}
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
                      <code className="text-[13px] text-error flex-1 truncate font-mono">{relay.listenUrl}</code>
                      <button className="text-base-content/30 group-hover:text-base-content/70 transition-colors ml-2">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-extrabold text-base-content/40 uppercase tracking-widest mb-1.5 block">Forwards To</label>
                    <div className="bg-base-200/30 rounded-[10px] p-3 border border-base-content/10 border-dashed">
                      <code className="text-[13px] text-base-content/70 truncate block font-mono">{relay.forwardsTo}</code>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-extrabold text-base-content/40 uppercase tracking-widest">Requests</span>
                      <span className="text-[15px] font-bold text-base-content">{relay.requests}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-extrabold text-base-content/40 uppercase tracking-widest">Success</span>
                      <span className="text-[15px] font-bold text-success">{relay.success}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-extrabold text-base-content/40 uppercase tracking-widest">Failed</span>
                      <span className="text-[15px] font-bold text-error">{relay.failed}</span>
                    </div>
                  </div>
                  {relay.success !== "--" && (
                    <Button className="btn-outline border-primary/20 hover:bg-primary/5 text-primary hover:border-primary/30 !rounded-[10px] text-[13px] font-bold h-9 min-h-0 px-4">
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            ))}

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
