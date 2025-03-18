import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input className={`border px-3 py-2 rounded-md focus:ring focus:ring-blue-300 ${className}`} {...props} />
  );
}
