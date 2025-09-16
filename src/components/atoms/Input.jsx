import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text", 
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-colors duration-200 bg-white placeholder:text-surface-400";

  return (
    <input
      type={type}
      ref={ref}
      className={cn(baseStyles, className)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;