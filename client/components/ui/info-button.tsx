import React from "react";
import { Button } from "./button";

const InfoButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button variant="info" size="lg" className="w-full flex gap-4">
      {children}
    </Button>
  );
};

export default InfoButton;
