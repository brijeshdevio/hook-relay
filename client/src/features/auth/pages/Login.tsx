import { Mail, Lock, Webhook } from 'lucide-react';
import { Button, Input } from '@/shared/ui';
import { useLoginFacade } from '../auth.hooks';
import { Link } from 'react-router-dom';

function Form() {
  const { isPending, submit, handleSubmit, register, errors } =
    useLoginFacade();

  return <form className="mt-8 space-y-4" onSubmit={handleSubmit(submit)}>
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
      Login
    </Button>
  </form>
}


export default function LoginPage() {

  return (
    <div className="w-full max-w-[420px] bg-base-200/40 border border-base-300/70 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-base-300/50 rounded-full flex items-center justify-center mb-3">
          <Webhook className="w-8 h-8 text-primary" />
        </div>
        <span className="text-xl font-bold text-base-content">HookRelay</span>
        <p className="text-sm text-base-content/60 mt-2">
          Welcome back, please enter your details
        </p>
      </div>

      <Form />
      <p className="mt-5 text-center text-sm text-base-content/60">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary hover:underline font-medium">Register</Link>
      </p>
      <p className="mt-12 text-center text-[10px] text-base-content/40 uppercase tracking-widest leading-relaxed font-medium">
        By signing up, you agree to our{' '}
        <a href="#" className="hover:text-base-content/60 transition-colors">Terms of Service</a>{' '}
        and{' '}
        <a href="#" className="hover:text-base-content/60 transition-colors">Privacy Policy</a>.
      </p>
    </div>
  );
}