import React from "react";

export const Badge = ({ children, variant, className }) => {
  const variantClasses = variant === "secondary" ? "bg-gray-200 text-gray-800" : "bg-primary text-primary-foreground";
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};
