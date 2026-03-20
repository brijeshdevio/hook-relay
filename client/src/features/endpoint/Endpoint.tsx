import {
  LayoutDashboard, Router, Activity, History, Settings,
  ArrowLeft, Pencil, Copy, ExternalLink, RefreshCw, ChevronRight,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "../../shared/ui/Button";

const SIDEBAR_NAV = [
  { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, active: false },
  { name: "Endpoints", icon: <Router className="w-5 h-5" />, active: true },
  { name: "Sources", icon: <Activity className="w-5 h-5" />, active: false },
  { name: "Logs", icon: <History className="w-5 h-5" />, active: false },
  { name: "Settings", icon: <Settings className="w-5 h-5" />, active: false },
];

const REQUESTS = [
  {
    method: "POST",
    date: "Oct 24, 2023",
    time: "14:22:31.402",
    status: "Delivered",
    statusDot: "bg-success",
    code: "200",
    codeColor: "text-success",
    duration: "124ms"
  },
  {
    method: "POST",
    date: "Oct 24, 2023",
    time: "14:18:05.118",
    status: "Failed",
    statusDot: "bg-error",
    code: "500",
    codeColor: "text-error",
    duration: "842ms"
  },
  {
    method: "POST",
    date: "Oct 24, 2023",
    time: "14:15:22.001",
    status: "Pending",
    statusDot: "bg-warning",
    code: "---",
    codeColor: "text-base-content/40",
    duration: "---"
  },
  {
    method: "POST",
    date: "Oct 24, 2023",
    time: "14:10:48.892",
    status: "Delivered",
    statusDot: "bg-success",
    code: "201",
    codeColor: "text-success",
    duration: "215ms"
  }
];

export default function Endpoint() {
  return (
    <div className="flex h-screen bg-base-200 text-base-content font-sans selection:bg-primary/30">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 border-r border-base-content/10 flex flex-col justify-between shrink-0 hidden md:flex">
        <div>
          {/* Logo */}


          {/* Navigation */}
          <nav className="px-3 py-4 space-y-1">
            {SIDEBAR_NAV.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-[14px] transition-colors ${item.active
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-base-content/70 hover:bg-base-200/50 hover:text-base-content"
                  }`}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Back Button Footer */}
        <div className="p-4 border-t border-base-content/10">
          <Button className="w-full btn-primary text-primary-content !rounded-xl text-[14px] font-bold h-11 flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Breadcrumb Header */}
          <div className="flex items-center gap-2 text-[14px] font-semibold text-base-content/50">
            <a href="#" className="hover:text-base-content transition-colors">Endpoints</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-base-content">Order Sync Webhook</span>
          </div>

          {/* Main Endpoint Card */}
          <div className="bg-base-100 rounded-[20px] p-6 lg:p-8 shadow-sm border border-base-content/10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                  <LinkIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold tracking-tight text-base-content">Order Sync Webhook</h1>
                    <div className="badge badge-success badge-sm py-2.5 px-3 font-bold text-[10px] uppercase tracking-wider bg-success/15 border-none text-success">
                      Active
                    </div>
                  </div>
                  <div className="text-[14px] text-base-content/60 font-medium">
                    Status: <span className="text-success font-bold">Healthy</span>
                  </div>
                </div>
              </div>
              <Button className="btn-outline border-base-content/20 hover:bg-base-200 hover:border-base-content/30 text-base-content !rounded-xl h-10 px-5 text-[14px] font-bold shadow-sm flex items-center gap-2 shrink-0">
                <Pencil className="w-4 h-4" />
                Edit Endpoint
              </Button>
            </div>

            {/* URLs Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-[11px] font-bold text-base-content/40 uppercase tracking-widest mb-2 block">Listen URL</label>
                <div className="flex items-center bg-base-200/50 rounded-xl p-3 border border-base-content/10 group">
                  <code className="text-[14px] text-error flex-1 truncate font-mono">https://api.webhookmonitor.com/listen/67890</code>
                  <button className="text-base-content/30 group-hover:text-base-content/70 transition-colors ml-2 p-1">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-base-content/40 uppercase tracking-widest mb-2 block">Forward URL</label>
                <div className="flex items-center bg-base-200/50 rounded-xl p-3 border border-base-content/10 group">
                  <code className="text-[14px] text-base-content/70 flex-1 truncate font-mono">https://your-app.com/api/webhooks/receive</code>
                  <button className="text-base-content/30 group-hover:text-base-content/70 transition-colors ml-2 p-1">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Area */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-[14px] bg-base-200/50 border border-base-content/5">
                <h3 className="text-[12px] font-bold text-base-content/50 mb-1">Created</h3>
                <div className="text-[18px] font-extrabold text-base-content">2023-10-12</div>
              </div>
              <div className="p-5 rounded-[14px] bg-base-200/50 border border-base-content/5">
                <h3 className="text-[12px] font-bold text-base-content/50 mb-1">Total Requests</h3>
                <div className="text-[18px] font-extrabold text-base-content mb-1">12,482</div>
                <div className="text-[11px] font-bold text-success">+5.2%</div>
              </div>
              <div className="p-5 rounded-[14px] bg-base-200/50 border border-base-content/5">
                <h3 className="text-[12px] font-bold text-base-content/50 mb-1">Delivered</h3>
                <div className="text-[18px] font-extrabold text-base-content mb-1">11,840</div>
                <div className="text-[11px] font-bold text-warning">94.8% RATE</div>
              </div>
              <div className="p-5 rounded-[14px] bg-base-200/50 border border-base-content/5">
                <h3 className="text-[12px] font-bold text-base-content/50 mb-1">Failed</h3>
                <div className="text-[18px] font-extrabold text-base-content mb-1">642</div>
                <div className="text-[11px] font-bold text-error">5.2% ERRORS</div>
              </div>
            </div>
          </div>

          {/* Requests Section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-base-content">Requests</h2>
                <div className="badge border-none bg-base-300 text-base-content/70 font-bold text-[11px] tracking-wide py-2">
                  48 total
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="join bg-base-100 p-1 border border-base-content/10 shadow-sm rounded-xl">
                  {["All", "Delivered", "Failed", "Pending"].map((tab, idx) => (
                    <button
                      key={tab}
                      className={`join-item btn btn-sm border-none bg-transparent shadow-none capitalize font-semibold text-[13px] px-4 ${idx === 0
                          ? "bg-base-200/80 text-base-content hover:bg-base-300 rounded-lg"
                          : "text-base-content/60 hover:bg-base-200/50"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <Button className="btn-square bg-base-100 border border-base-content/10 hover:bg-base-200 shadow-sm !rounded-xl shrink-0 h-10 w-10">
                  <RefreshCw className="w-4 h-4 text-base-content/60" />
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-base-100 rounded-[20px] shadow-sm border border-base-content/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead className="bg-base-200/30 text-base-content/50 text-[11px] uppercase tracking-widest font-extrabold">
                    <tr>
                      <th className="py-4">Method</th>
                      <th className="py-4 text-left">Received At</th>
                      <th className="py-4">Status</th>
                      <th className="py-4 text-center">Code</th>
                      <th className="py-4 text-right">Time</th>
                      <th className="py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px] font-medium text-base-content/80">
                    {REQUESTS.map((req, idx) => (
                      <tr key={idx} className="hover:bg-base-200/20 border-b border-base-content/5 text-center">
                        <td>
                          <div className="inline-flex bg-primary/10 text-primary px-2.5 py-1 rounded-[6px] text-[11px] font-extrabold uppercase tracking-wider">
                            {req.method}
                          </div>
                        </td>
                        <td className="text-left py-4">
                          <div className="font-semibold text-base-content text-[13px]">{req.date}</div>
                          <div className="text-base-content/40 text-[11px] font-mono mt-0.5">{req.time}</div>
                        </td>
                        <td>
                          <div className="inline-flex items-center gap-2 font-bold text-[13px] justify-center text-base-content">
                            <span className={`w-2 h-2 rounded-full ${req.statusDot}`}></span>
                            {req.status}
                          </div>
                        </td>
                        <td className={`font-mono font-bold text-[12px] opacity-90 ${req.codeColor}`}>
                          {req.code}
                        </td>
                        <td className="text-right">
                          <span className="font-mono text-[13px] opacity-70">{req.duration}</span>
                        </td>
                        <td>
                          <Button className="btn-ghost btn-xs text-primary hover:text-primary hover:bg-primary/10 font-bold text-[12px] px-3">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 mb-8">
              <div className="text-[13px] font-semibold text-base-content/50">
                Showing 1 to 10 of 48 entries
              </div>
              <div className="join shadow-sm border border-base-content/10 rounded-xl overflow-hidden bg-base-100">
                <button className="join-item btn btn-sm bg-base-100 border-none hover:bg-base-200 text-base-content/70 font-bold capitalize px-4">Previous</button>
                <button className="join-item btn btn-sm bg-primary border-none text-primary-content font-bold px-4 hover:bg-primary">1</button>
                <button className="join-item btn btn-sm bg-base-100 border-none hover:bg-base-200 text-base-content/70 font-bold px-4">2</button>
                <button className="join-item btn btn-sm bg-base-100 border-none hover:bg-base-200 text-base-content/70 font-bold px-4">3</button>
                <button className="join-item btn btn-sm bg-base-100 border-none hover:bg-base-200 text-base-content/70 font-bold capitalize px-4">Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
