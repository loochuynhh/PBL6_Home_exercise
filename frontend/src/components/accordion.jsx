import React from "react";

export const Accordion = ({ children, className }) => (
  <div className={`space-y-2 ${className}`}>{children}</div>
);

export const AccordionItem = ({ children, value }) => (
  <div className="border-b">
    {children}
  </div>
);

export const AccordionTrigger = ({ children }) => (
  <button className="text-lg font-semibold w-full py-2 text-left">
    {children}
  </button>
);

export const AccordionContent = ({ children }) => (
  <div className="pt-2 pl-4">{children}</div>
);
