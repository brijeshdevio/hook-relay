import { AlertCircle, Mail, Lock, Github, Webhook } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

export default function Login() {
  return (
    <div className="">
      <div className="mb-8 flex items-center gap-2 mx-auto w-fit">
        <div className="bg-primary text-primary-content p-1.5 rounded-[10px] shadow-sm">
          <Webhook className="w-5 h-5" />
        </div>
        <span className="text-[22px] font-extrabold tracking-tight">HookRelay</span>
      </div>

      <div className="w-full max-w-[28rem] bg-base-100 rounded-[20px] shadow-xl border border-base-content/5">
        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-[1.75rem] font-bold mb-2">Welcome back</h1>
            <p className="text-base-content/60 text-[15px]">
              New here?{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                Sign up for an account
              </a>
            </p>
          </div>

 

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Email address"
              type="email"
              placeholder="name@company.com"
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="login_password" className="text-base-content/70 text-[14px] font-medium">Password</label>
                <a href="#" className="text-[13px] text-primary hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                className=""
                id="login_password"
              />
            </div>

            

            <Button className="w-full btn-primary h-12 text-[15px] font-semibold ">
              Login
            </Button>
          </form>         
        </div>

      </div>

     
    </div>
  );
}
