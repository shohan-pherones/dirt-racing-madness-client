import { PropsWithChildren } from "react";

const SectionTitle = ({ children }: PropsWithChildren) => {
  return (
    <h2 className="text-xl md:text-2xl font-medium mb-5 md:mb-10">
      {children}
    </h2>
  );
};

export default SectionTitle;
