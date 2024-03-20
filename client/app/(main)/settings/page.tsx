import { ThemeToggle } from "@/components/theming/ThemeToggle";
import { Cog, Lock, Smartphone, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ReactNode } from 'react';

const LinkSettings = ({ children }: {children: React.ReactNode}) => {
  return(
    <Link 
      href="/" 
      className="flex p-6 items-center justify-center rounded-xl hover:bg-blue-200 transition"
    >
      {children}
    </Link>
  )
}

const SettingsPage = () => {
  return (
    <div className="container p-0 grid grid-cols-12 h-screen">
      <title>y . настройки</title>
      <div className="flex flex-col gap-8 items-center col-span-1 py-4 border-x">
        <LinkSettings>
          <User className="size-8" />
        </LinkSettings>
        <LinkSettings>
          <Lock className="size-8" />
        </LinkSettings>
        <LinkSettings>
          <Smartphone className="size-8" />
        </LinkSettings>
        <LinkSettings>
          <Cog className="size-8" />
        </LinkSettings>
      </div>
      <div className="col-span-11 py-4 px-4 border-r">
        <h2 className="text-3xl">Настройки</h2>
        <div className="py-4">
          <hr />
        </div>
        <div>
          <h3 className="text-lg">Внешний вид</h3>
          <ThemeToggle align="start" />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
