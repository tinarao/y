import React from "react";
import { Button } from "./button";

const InfoButton = ({ children, asChild }: { children: React.ReactNode, asChild?: boolean }) => {
  return (
    <Button 
      asChild={asChild}
      variant="info" 
      size="lg" 
      className="w-full flex gap-4"
    >
      {children}
    </Button>
  );
};

export default InfoButton;
