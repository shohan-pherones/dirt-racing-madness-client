import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="py-10 md:py-20 flex items-center justify-center gap-2">
      <Loader2 className="animate-spin" />
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
