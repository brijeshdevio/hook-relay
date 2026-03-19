import {  Home, LayoutDashboard, Link2Off } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col font-sans selection:bg-primary/30">
      
     

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center relative p-6 overflow-hidden">
        
        {/* Massive Background '404' Text */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none -z-10 overflow-hidden">
          <span className="text-[35vw] font-extrabold text-primary/[0.04] leading-none tracking-tighter mix-blend-multiply dark:mix-blend-screen -mt-20">
            404
          </span>
        </div>

        <div className="max-w-xl w-full text-center relative z-10 flex flex-col items-center">
          
          {/* Circular Icon Background */}
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-8 mx-auto -mt-10">
            <Link2Off className="w-12 h-12 text-primary" strokeWidth={2.5} />
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-base-content tracking-tight mb-4">
            Page not found
          </h1>
          
          <p className="text-lg text-base-content/60 font-medium mb-10 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
           <Link to="/dashboard">
            <Button className="w-full sm:w-auto btn-primary h-12 px-8 !rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 shadow-sm">
              <LayoutDashboard className="w-[18px] h-[18px]" strokeWidth={2.5} />
              Go to Dashboard
            </Button>
           </Link>
            
           <Link to={"/"}>
            <Button className="w-full sm:w-auto btn-outline border-base-content/10 hover:bg-base-200 hover:border-base-content/20 text-base-content h-12 px-8 !rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 bg-base-100 shadow-sm">
              <Home className="w-[18px] h-[18px]" strokeWidth={2.5} />
              Back to Home
            </Button>
           </Link>
          </div>
          
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-[13px] font-medium text-base-content/40 bg-base-200/50">
        © 2024 HookRelay. All systems operational.
      </footer>

    </div>
  );
}
