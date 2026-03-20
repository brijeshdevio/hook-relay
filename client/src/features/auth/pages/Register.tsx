import {
  Check,
  Mail,
  Lock,
  User2,
  Webhook
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@/shared/ui';
import { useRegisterFacade } from '../auth.hooks';

function Form() {
  const { isPending, submit, handleSubmit, register, errors } =
    useRegisterFacade();

  return <form className="mt-8 space-y-4" onSubmit={handleSubmit(submit)}>
    {/* Full Name */}
    <Input
      label='Full Name'
      placeholder='John Doe'
      leftIcon={<User2 className="text-base-content/40 w-4 h-4" />}
      {...register("name")}
      error={errors.name}
    />

    {/* Email Address */}
    <Input
      label='Email Address'
      type='email'
      {...register("email")}
      error={errors.email}
      placeholder='name@company.com'
      leftIcon={<Mail className="text-base-content/40 w-4 h-4" />}
    />

    {/* Password */}
    <Input
      label='Password'
      type='password'
      {...register("password")}
      error={errors.password}
      placeholder='••••••••'
      leftIcon={<Lock className="text-base-content/40 w-4 h-4" />}
    />
    <Button type="submit" className="btn-primary w-full mt-2"
      isLoading={isPending}
    >
      Create Account
    </Button>
  </form>
}

export default function Register() {

  return (
    <main className="flex flex-col lg:flex-row bg-base-100 h-screen">
      {/* Left Panel - Branding & Information */}
      <section className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-base-200">
        <div>
          <div className="flex items-center gap-3">
            <Webhook className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-base-content">HookRelay</span>
          </div>

          <div className="max-w-xl mt-24">
            <h1 className="text-5xl font-bold leading-[1.15] text-base-content">
              Stop debugging<br />
              webhooks <span className="text-primary">in the<br />dark.</span>
            </h1>

            <div className="mt-10 space-y-6">
              {[
                'Real-time webhook monitoring',
                'Instant retries and logging',
                'Secure payload delivery',
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20">
                    <Check className="w-3.5 h-3.5 text-primary stroke-[3]" />
                  </div>
                  <span className="text-base-content/80 text-lg">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Right Panel - Registration Form */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[420px]">
          <h2 className="text-3xl font-bold text-base-content tracking-tight">Create your account</h2>
          <p className="mt-2 text-sm text-base-content/60">
            Join thousands of developers automating their workflow.
          </p>
          <Form />
          <p className="mt-5 text-center text-sm text-base-content/60">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">Log in</Link>
          </p>
          <p className="mt-12 text-center text-[10px] text-base-content/40 uppercase tracking-widest leading-relaxed font-medium">
            By signing up, you agree to our{' '}
            <a href="#" className="hover:text-base-content/60 transition-colors">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="hover:text-base-content/60 transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </section>
    </main>
  );
};
