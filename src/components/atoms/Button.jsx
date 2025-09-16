import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-white shadow-md hover:shadow-lg hover:scale-105 focus:ring-gold-400",
    secondary: "border-2 border-gold-400 text-gold-600 hover:bg-gold-50 hover:scale-105 focus:ring-gold-400",
    ghost: "text-primary-600 hover:bg-surface-50 hover:scale-105 focus:ring-primary-400",
    danger: "bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white shadow-md hover:shadow-lg hover:scale-105 focus:ring-red-400"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-6 py-2.5 text-sm rounded-lg",
    lg: "px-8 py-3 text-base rounded-lg"
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;