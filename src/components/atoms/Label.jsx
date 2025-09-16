import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Label = forwardRef(({ 
  className, 
  children,
  ...props 
}, ref) => {
  const baseStyles = "block text-sm font-medium text-primary-700 mb-2";

  return (
    <label
      ref={ref}
      className={cn(baseStyles, className)}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

export default Label;