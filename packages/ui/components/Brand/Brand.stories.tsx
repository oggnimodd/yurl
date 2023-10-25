import React from "react";
import Brand from "./Brand";

export const Default = () => {
  return <Brand title="Custom Title" />;
};

export const CustomStyles = () => {
  return <Brand title="Custom Styles" className="text-danger-500 underline" />;
};
