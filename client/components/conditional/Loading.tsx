import { Loader2Icon } from "lucide-react";
import React from "react";

const Loading = ({ py }: { py?: string }) => {
  return (
    <div className={`w-fit mx-auto py-${py ? py : "12"}`}>
      <Loader2Icon className="animate-spin size-12" />
    </div>
  );
};

export default Loading;
