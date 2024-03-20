import AuthorizedOnly from "@/components/guard/AuthorizedOnly";
import React from "react";
import Header from "./_components/header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <AuthorizedOnly>
        <div className="h-screen">
          <Header />
          {children}
        </div>
      </AuthorizedOnly>
  );
};

export default MainLayout;
