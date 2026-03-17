import { Webhook } from "lucide-react";
export function Footer() {
  return (
    <footer className="bg-base-100/70 text-base-content/70 border-t border-white/10 px-4 py-8 text-sm">
      <div className="mx-auto max-w-md space-y-6 text-center">
        {/* Logo and Name */}
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-xl">
            <Webhook className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight">
              HookRelay
            </span>
            <span className="text-base-content/50 text-[11px] font-medium tracking-[0.18em] uppercase">
              Webhook Monitoring Tool
            </span>
          </span>
        </div>

        {/* Description */}
        <p>
          The developer-first webhook monitoring platform. Never miss an event
          again.
        </p>

        {/* Links */}
        <div className="text-base-content/70 flex justify-center space-x-8">
          <a href="#" className="hover:text-primary">
            Features
          </a>
          <a href="#" className="hover:text-primary">
            Pricing
          </a>
          <a href="#" className="hover:text-primary">
            Security
          </a>
          <a href="#" className="hover:text-primary">
            Privacy Policy
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} HookRelay. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
