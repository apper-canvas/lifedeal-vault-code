import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Switch = forwardRef(({ 
  checked, 
  onCheckedChange,
  className, 
  ...props 
}, ref) => {
  const baseStyles = "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const checkedStyles = checked ? "bg-gold-500" : "bg-surface-200";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      ref={ref}
      className={cn(baseStyles, checkedStyles, className)}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
});

Switch.displayName = "Switch";

export default Switch;