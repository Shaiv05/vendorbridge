"use client";
import { forwardRef, type InputHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
  ),
);
Input.displayName = "Input";

export const Label = ({ className, ...props }: HTMLAttributes<HTMLLabelElement>) => (
  <label className={cn("text-xs font-semibold uppercase tracking-wide text-muted-foreground", className)} {...props} />
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "destructive" | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      ghost: "hover:bg-muted text-foreground",
      outline: "border border-input bg-background hover:bg-muted",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      gradient: "bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95",
    };
    const sizes = { sm: "h-9 px-3 text-sm", md: "h-10 px-4 text-sm", lg: "h-11 px-6 text-base", icon: "h-10 w-10" };
    return <button ref={ref} className={cn("inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)} {...props} />;
  },
);
Button.displayName = "Button";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-border bg-card shadow-card", className)} {...props} />;
}
