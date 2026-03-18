import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";
import { clsx } from "clsx";

export interface InputDto extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: { message?: string };
  leftIcon?: React.ReactNode;
  wrapperClassName?: string;
}

export function Input({ label, error, leftIcon, wrapperClassName, ...props }: InputDto) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const id = useId();

  const handleTogglePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={props?.id ?? id}
          className="text-base-content/70 text-[14px] font-medium"
        >
          {label}
        </label>
      )}
      <div className={clsx("input w-full flex items-center gap-2", wrapperClassName || "rounded-lg")}>
        {leftIcon && <span className="text-base-content/40 flex items-center">{leftIcon}</span>}
        <input
          {...props}
          id={props?.id ?? id}
          className={clsx("grow", props.className)}
          type={isVisiblePassword ? "text" : props.type}
        />
        {props.type === "password" && (
          <button type="button" className="text-base-content/40 flex items-center hover:text-base-content transition-colors" onClick={handleTogglePassword}>
            {isVisiblePassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <span className="text-[13px] text-error mt-0.5">{error?.message}</span>}
    </div>
  );
}
