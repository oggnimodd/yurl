import React from "react";
import { cn } from "@ui/utils/cn";

export interface BrandProps extends React.HTMLAttributes<HTMLSpanElement> {
  title: string;
}

const Brand: React.FC<BrandProps> = ({ title, className, ...restProps }) => {
  return (
    <span
      className={cn(
        "inline-block text-3xl font-bold text-primary-400",
        className,
      )}
      {...restProps}
    >
      {title}
    </span>
  );
};

export default Brand;
