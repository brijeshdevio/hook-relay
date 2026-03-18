import { Link as LinkIcon, Code, MonitorPlay, Search, Bell, RotateCcw, History } from "lucide-react";
import { Button } from "../../shared/ui/Button";

const STEPS = [
  {
    icon: <LinkIcon className="w-5 h-5 text-[#E75B26]" />,
    title: "Create Endpoint",
    description: "Generate a unique, secure URL in seconds to receive your webhook data.",
  },
  {
    icon: <Code className="w-5 h-5 text-[#E75B26]" />,
    title: "Point Your Service",
    description: "Update your provider (Stripe, GitHub, etc.) to use your new Relay URL.",
  },
  {
    icon: <MonitorPlay className="w-5 h-5 text-[#E75B26]" />,
    title: "Inspect & Replay",
    description: "Watch traffic flow in real-time. Replay failed requests with a single click.",
  },
];

const FEATURES = [
  {
    icon: <Search className="w-5 h-5 text-[#E75B26]" />,
    title: "Request Inspector",
    description: "Deep dive into every header, query parameter, and JSON payload with syntax highlighting.",
  },
  {
    icon: <Bell className="w-5 h-5 text-[#E75B26]" />,
    title: "Instant Alerts",
    description: "Get notified via Slack, Discord, or Email the moment a delivery fails.",
  },
  {
    icon: <RotateCcw className="w-5 h-5 text-[#E75B26]" />,
    title: "One-Click Replay",
    description: "Fixed a bug in your code? Replay the exact same payload to test your fix instantly.",
  },
  {
    icon: <History className="w-5 h-5 text-[#E75B26]" />,
    title: "Request History",
    description: "Maintain a 30-day audit log of every request for debugging and compliance.",
  },
];

export default function Home() {
  return (
    <div className="text-slate-300 font-sans selection:bg-primary/30 ">
      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-4 pt-28 pb-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
          Trusted by 10,000+ Developers
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
          Never Lose a <span className="text-primary">Webhook</span> <br className="hidden md:block" /> Again
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-light">
          Capture, inspect, and replay webhook events with ease. Built for developers who need rock-solid reliability and real-time visibility.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button className="md:btn-lg btn-primary">
            Start for Free
          </Button>
          <Button className="md:btn-lg btn-secondary">
            See How It Works
          </Button>
        </div>
        
        {/* Terminal Window Mockup */}
        <div className="w-full max-w-4xl mt-20 rounded-xl border border-white/10 bg-[#161B22] shadow-2xl overflow-hidden text-left text-sm font-mono leading-relaxed">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0D1117] border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Live Stream</div>
            <div className="w-12"></div>
          </div>
          
          <div className="p-6 overflow-x-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-4">
                <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">POST</span>
                <span className="text-green-400 font-bold text-sm">200 OK</span>
                <span className="text-slate-500 text-sm">142ms</span>
              </div>
              <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span> Delivered
              </div>
            </div>
            
            <pre className="text-slate-300 text-[13px] leading-6">
              <code>
<span className="text-slate-300">{`{`}</span>
<br />
  <span className="text-[#E75B26]">"event"</span>: <span className="text-slate-200">"checkout.session.completed"</span>,
<br />
  <span className="text-[#E75B26]">"created"</span>: <span className="text-[#79C0FF]">1689345210</span>,
<br />
  <span className="text-[#E75B26]">"data"</span>: {`{`}
<br />
    <span className="text-[#E75B26]">"object"</span>: {`{`}
<br />
      <span className="text-[#E75B26]">"id"</span>: <span className="text-slate-200">"cs_test_a1b2c3d4"</span>,
<br />
      <span className="text-[#E75B26]">"amount_total"</span>: <span className="text-[#79C0FF]">2900</span>,
<br />
      <span className="text-[#E75B26]">"currency"</span>: <span className="text-slate-200">"usd"</span>,
<br />
      <span className="text-[#E75B26]">"customer_email"</span>: <span className="text-slate-200">"dev@example.com"</span>,
<br />
      <span className="text-[#E75B26]">"payment_status"</span>: <span className="text-slate-200">"paid"</span>
<br />
    {`}`}
<br />
  {`}`}
<br />
{`}`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="mx-auto max-w-5xl px-4 py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Simple as 3 steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, idx) => (
            <div key={idx} className="bg-primary/20 border border-white/5 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-[15px] leading-relaxed font-light">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-5xl px-4 pb-10">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Everything you need to debug</h2>
          <p className="text-slate-400 text-lg font-light">Powerful tools designed specifically for the modern developer workflow.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="bg-secondary/30 border border-white/5 rounded-2xl p-8 flex gap-5 hover:border-primary/30 transition-all duration-300">
              <div className="flex-shrink-0 mt-1">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-[15px] leading-relaxed font-light">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
