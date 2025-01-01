import React from "react";

export const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300 ${className}`}
  >
    {children}
  </button>
);
