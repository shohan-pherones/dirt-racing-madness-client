import { Loader2 } from "lucide-react";

const Processing = () => {
  return (
    <span className="flex items-center justify-center gap-2.5">
      <Loader2 className="animate-spin" />
      <span>Processing...</span>
    </span>
  );
};

export default Processing;
