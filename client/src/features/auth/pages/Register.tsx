import { Check, History, Lock, Mail, Star, User, Webhook, Github } from "lucide-react";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";

export default function Register() {
  return (
    <div className="flex selection:bg-primary/30 pt-48">
      {/* Left Panel */}
      <div className="hidden lg:flex w-[45%] bg-[#361c13] flex-col justify-between p-12 lg:p-16 xl:p-20 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-16">
            <div className="bg-primary text-primary-content p-1.5 rounded-[10px] shadow-sm">
              <Webhook className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">WebhookMonitor</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-12">
            Stop debugging <br/> webhooks <span className="text-primary">in</span> <br/>
            <span className="text-primary relative inline-block">
              the dark.
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-primary/30 -z-10 translate-y-[-4px]"></span>
            </span>
          </h1>

          <ul className="space-y-6 mb-12">
            {[
              "Real-time delivery monitoring",
              "Automatic retry logic visualization",
              "Payload inspection & diffing"
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center gap-4 text-[17px] text-white/90 font-medium tracking-wide">
                <div className="bg-primary/20 text-primary rounded-full p-1 border border-primary/20 shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <div className="bg-[#241510] rounded-2xl p-7 border border-white/5 relative z-10 shadow-xl max-w-md">
          <div className="flex gap-1 mb-4 text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current stroke-current" />
            ))}
          </div>
          <p className="text-[15px] text-white/80 italic mb-6 leading-relaxed">
            "Saved our team hundreds of hours during the API integration phase. Essential tool for modern dev teams."
          </p>
          <div className="flex items-center gap-3">
            <img 
              src="https://i.pravatar.cc/150?u=sarah" 
              alt="Sarah Chen" 
              className="w-10 h-10 rounded-full border border-white/10"
            />
            <div>
              <div className="text-sm font-bold text-white">Sarah Chen</div>
              <div className="text-[13px] text-white/50">Lead Engineer at DevFlow</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-base-100 flex flex-col justify-center p-8 sm:p-12 lg:p-20 overflow-y-auto">
        <div className="w-full max-w-[440px] mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2 text-base-content">Create your account</h2>
            <p className="text-base-content/60 text-[15px]">Join 10,000+ developers monitoring their APIs.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              leftIcon={<User className="w-4 h-4 opacity-70" />}
              id="register_name"
            />

            <Input
              label="Work Email"
              type="email"
              placeholder="john@company.com"
              leftIcon={<Mail className="w-4 h-4 opacity-70" />}
              id="register_email"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4 opacity-70" />}
                id="register_password"
              />
              <Input
                label="Confirm"
                type="password"
                placeholder="••••••••"
                leftIcon={<History className="w-4 h-4 opacity-70" />}
                id="register_confirm"
              />
            </div>

            <div className="flex items-start gap-3 pt-2 pb-2">
              <input type="checkbox" id="terms" className="checkbox checkbox-primary checkbox-sm mt-0.5 rounded" />
              <label htmlFor="terms" className="text-[13px] text-base-content/70 leading-relaxed cursor-pointer select-none">
                By creating an account, I agree to the <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>.
              </label>
            </div>

            <Button className="w-full btn-primary h-12 text-[15px] font-semibold mt-2">
              Create Account
            </Button>
          </form>

          <div className="divider text-[11px] text-base-content/40 font-bold tracking-widest my-8 uppercase">OR CONTINUE WITH</div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button className="btn-outline border-base-content/10 hover:bg-base-200 hover:border-base-content/20 text-base-content rounded-xl h-11 font-semibold text-sm">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4 mr-2" />
              Google
            </Button>
            <Button className="btn-outline border-base-content/10 hover:bg-base-200 hover:border-base-content/20 text-base-content rounded-xl h-11 font-semibold text-sm">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>

          <p className="text-center text-[14px] text-base-content/60">
            Already have an account? <a href="#" className="text-primary font-bold hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
