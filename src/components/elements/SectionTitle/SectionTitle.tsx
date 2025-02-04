import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  margin?: boolean;
}

const SectionTitle = ({ children, margin = true }: SectionTitleProps) => {
  return (
    <h2
      className={cn(
        "text-xl md:text-2xl font-medium",
        margin && "mb-5 md:mb-10"
      )}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
