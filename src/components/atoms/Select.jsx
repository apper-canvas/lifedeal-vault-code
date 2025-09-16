import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ 
  className, 
  children,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-colors duration-200 bg-white";

  return (
    <select
      ref={ref}
      className={cn(baseStyles, className)}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;