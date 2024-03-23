"use client"

import { ThemeToggle } from "@/components/theming/ThemeToggle";
import { useTheme } from "next-themes";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {

  const { theme } = useTheme()

  return (
    <main className="grid grid-cols-12 h-screen">
        <div className="col-span-3 flex flex-col items-center justify-end mb-8 gap-4 ">  
          {children}
        </div>
        <div className="col-span-9 relative">
        {theme === "dark" ? (
          <Image 
          className="object-cover border-l"
          src="/dark-auth-bg.jpg"
          fill 
          alt="Красивый пейзаж" 
        />
        ) : (
          <Image 
          className="object-cover border-l"
          src="/light-auth-bg.jpg"
          fill 
          alt="Красивый пейзаж" 
        />
        )}
        </div>
    </main>
  );
};

export default AuthLayout;
