import {
  LayoutDashboard, Router, History, Settings,
  ArrowLeft, Copy, RotateCcw,
  TerminalSquare, ListOrdered, Info, Code, Zap
} from "lucide-react";
import { Button } from "../../shared/ui/Button";

const SIDEBAR_NAV = [
  { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, active: false },
  { name: "Endpoints", icon: <Router className="w-5 h-5" />, active: true },
  { name: "Logs", icon: <History className="w-5 h-5" />, active: false },
  { name: "Settings", icon: <Settings className="w-5 h-5" />, active: false },
];

export default function WebhookPage() {
  return (
    <div className="flex h-screen bg-base-200 text-base-content font-sans">
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
                  ? "bg-[#E75B26]/10 text-[#E75B26] border border-[#E75B26]/20"
                  : "text-base-content/70 hover:bg-base-200/50 hover:text-base-content"
                  }`}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-base-content/10">
          <div className="flex items-center gap-3 px-2 py-2">
            <img
              src="https://i.pravatar.cc/150?u=alex"
              alt="Alex Rivera"
              className="w-10 h-10 rounded-full border border-base-content/10"
            />
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-base-content leading-tight">Alex Rivera</span>
              <span className="text-[12px] text-base-content/50 font-medium tracking-wide">Pro Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Header Row */}
        <header className="bg-base-100 border-b border-base-content/10 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-base-content/50">
              <ArrowLeft className="w-4 h-4" />
              <a href="#" className="hover:text-base-content transition-colors">Back to Endpoints</a>
              <span className="text-base-content/30">/</span>
              <span className="text-base-content">Request Detail</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#E75B26] text-white px-3 py-1 rounded-[6px] text-[12px] font-extrabold tracking-wider">
                POST
              </div>
              <div className="bg-base-200/50 px-3 py-1.5 rounded-[8px] font-mono text-[14px] font-bold text-base-content/80 border border-base-content/5 flex items-center gap-2">
                550e8400-e29b-41d4-a716-446655440000
              </div>
              <div className="bg-success/20 text-success border-none px-3 py-1.5 rounded-full text-[12px] font-extrabold tracking-wide flex items-center gap-1.5 ml-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                200 OK
              </div>
            </div>
          </div>

          <Button className="bg-[#E75B26] hover:bg-[#D44E1C] text-white border-none font-bold text-[14px] px-5 h-10 rounded-[10px] shadow-sm flex items-center gap-2 mt-2 sm:mt-0">
            <RotateCcw className="w-4 h-4" />
            Replay Request
          </Button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 ">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

            {/* Left Column - Payloads */}
            <div className="flex-1 space-y-6">

              {/* Request Body */}
              <div className="bg-base-100 rounded-2xl border border-base-content/10 shadow-sm overflow-hidden">
                <div className="border-b border-base-content/5 px-5 py-4 flex items-center justify-between bg-base-100">
                  <div className="flex items-center gap-2 text-[#E75B26] font-bold text-[15px]">
                    <Code className="w-5 h-5" />
                    Request Body
                  </div>
                  <button className="text-base-content/40 hover:text-base-content transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-[#161B22] p-6 text-[13.5px] font-mono leading-relaxed overflow-x-auto text-slate-300">
                  <code>
                    <span className="text-slate-300">{`{`}</span><br />
                    &nbsp;&nbsp;<span className="text-slate-400">"event"</span>: <span className="text-slate-200">"payment.succeeded"</span>,<br />
                    &nbsp;&nbsp;<span className="text-slate-400">"created_at"</span>: <span className="text-slate-200">"2023-10-27T10:30:00Z"</span>,<br />
                    &nbsp;&nbsp;<span className="text-slate-400">"data"</span>: {`{`}<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">"id"</span>: <span className="text-slate-200">"pay_9k2m3n4b5v6c"</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">"amount"</span>: <span className="text-[#79C0FF]">4900</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">"currency"</span>: <span className="text-slate-200">"usd"</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">"customer"</span>: {`{`}<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">"name"</span>: <span className="text-slate-200">"Jane Doe"</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">"email"</span>: <span className="text-slate-200">"jane@example.com"</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;{`}`},<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">"metadata"</span>: {`{`}<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">"order_id"</span>: <span className="text-slate-200">"ord_8829"</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;{`}`}<br />
                    &nbsp;&nbsp;{`}`}<br />
                    <span className="text-slate-300">{`}`}</span>
                  </code>
                </div>
              </div>

              {/* Request Headers */}
              <div className="bg-base-100 rounded-2xl border border-base-content/10 shadow-sm overflow-hidden">
                <div className="border-b border-base-content/5 px-5 py-4 flex items-center justify-between bg-base-100">
                  <div className="flex items-center gap-2 font-bold text-[15px] text-base-content">
                    <ListOrdered className="w-5 h-5 text-[#E75B26]" />
                    Request Headers
                  </div>
                </div>

                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F8FAFC]">
                    <tr>
                      <th className="py-3 px-5 text-[11px] font-bold text-base-content/40 uppercase tracking-widest border-b border-base-content/5 w-1/3">Header Key</th>
                      <th className="py-3 px-5 text-[11px] font-bold text-base-content/40 uppercase tracking-widest border-b border-base-content/5">Value</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13.5px] font-mono border-b border-base-content/5">
                    <tr className="border-b border-base-content/5">
                      <td className="py-4 px-5 text-[#E75B26] font-bold">Content-Type</td>
                      <td className="py-4 px-5 text-base-content/70">application/json</td>
                    </tr>
                    <tr className="border-b border-base-content/5">
                      <td className="py-4 px-5 text-[#E75B26] font-bold">User-Agent</td>
                      <td className="py-4 px-5 text-base-content/70">Webhook-Worker/2.0 (linux-amd64)</td>
                    </tr>
                    <tr className="border-b border-base-content/5">
                      <td className="py-4 px-5 text-[#E75B26] font-bold">X-Signature-Sha256</td>
                      <td className="py-4 px-5 text-base-content/70">e3b0c44298fc1c149afbf4c8996fb92427ae41...</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-5 text-[#E75B26] font-bold">Accept</td>
                      <td className="py-4 px-5 text-base-content/70">*/*</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column - Meta & Actions */}
            <div className="w-full lg:w-[380px] space-y-6 shrink-0">

              {/* Delivery Info */}
              <div className="bg-base-100 rounded-2xl border border-base-content/10 shadow-sm overflow-hidden">
                <div className="border-b border-base-content/5 px-5 py-4 bg-[#F8FAFC] flex items-center gap-2 font-bold text-[15px] text-base-content">
                  <Info className="w-5 h-5 text-[#E75B26]" />
                  Delivery Info
                </div>

                <div className="p-5 flex flex-col gap-5 text-[14px]">
                  <div className="flex items-center justify-between pb-4 border-b border-base-content/5">
                    <span className="text-base-content/60 font-medium">Status</span>
                    <span className="bg-success/20 text-success px-2.5 py-0.5 rounded-full text-[11px] font-extrabold tracking-wide uppercase">Delivered</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-base-content/5">
                    <span className="text-base-content/60 font-medium">Attempts</span>
                    <span className="font-bold font-mono">1 / 5</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-base-content/5">
                    <span className="text-base-content/60 font-medium">Response Code</span>
                    <span className="text-success font-extrabold font-mono">200</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-base-content/5">
                    <span className="text-base-content/60 font-medium">Time Taken</span>
                    <span className="font-mono text-base-content/80">142ms</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-base-content/60 font-medium">Forwarded To</span>
                    <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-base-content/5 font-mono text-[11px] text-base-content/60 break-all leading-relaxed">
                      https://api.myapp.com/v1/webhooks/receiver
                    </div>
                  </div>
                </div>
              </div>

              {/* Server Response */}
              <div className="bg-base-100 rounded-2xl border border-base-content/10 shadow-sm overflow-hidden">
                <div className="border-b border-base-content/5 px-5 py-4 bg-[#F8FAFC] flex items-center gap-2 font-bold text-[15px] text-base-content">
                  <TerminalSquare className="w-5 h-5 text-[#E75B26]" />
                  Server Response
                </div>
                <div className="p-5">
                  <div className="bg-[#161B22] p-4 rounded-xl text-[12px] font-mono leading-relaxed overflow-x-auto text-slate-300">
                    <code>
                      {`{`} <br />
                      &nbsp;&nbsp;<span className="text-slate-400">"status"</span>: <span className="text-slate-200">"success"</span>,<br />
                      &nbsp;&nbsp;<span className="text-slate-400">"received"</span>: <span className="text-[#8957E5]">true</span>,<br />
                      &nbsp;&nbsp;<span className="text-slate-400">"timestamp"</span>: <span className="text-slate-200">"2023-10-27T10:30:00.142Z"</span><br />
                      {`}`}
                    </code>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-base-100 rounded-2xl border border-base-content/10 shadow-sm overflow-hidden">
                <div className="border-b border-base-content/5 px-5 py-4 bg-[#F8FAFC] flex items-center gap-2 font-bold text-[15px] text-base-content">
                  <Zap className="w-5 h-5 text-[#E75B26]" />
                  Quick Actions
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <Button className="w-full bg-[#E75B26] hover:bg-[#D44E1C] text-white border-none font-bold text-[14px] h-11 rounded-[10px] shadow-sm flex items-center justify-center gap-2">
                    <RotateCcw className="w-4 h-4 shrink-0" />
                    Replay This Request
                  </Button>
                  <Button className="w-full bg-base-100 hover:bg-base-200 text-base-content border border-base-content/10 font-bold text-[14px] h-11 rounded-[10px] shadow-sm flex items-center justify-center gap-2">
                    <Copy className="w-4 h-4 text-base-content/50 shrink-0" />
                    Export Payload
                  </Button>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
