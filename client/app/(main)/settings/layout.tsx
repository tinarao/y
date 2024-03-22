import { ThemeToggle } from "@/components/theming/ThemeToggle";
import { Cog, Lock, Smartphone, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const LinkSettings = ({ children, href }: { children: React.ReactNode, href?: string }) => {
  return (
    <Link
      href={href ? href : "/"}
      className="flex p-6 items-center justify-center rounded-xl hover:bg-blue-200 transition"
    >
      {children}
    </Link>
  );
};

const SettingsPage = ({ children }: { children: React.ReactNode }) => {
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
        <LinkSettings href="/settings/general">
            <Cog className="size-8" />
        </LinkSettings>
      </div>
      <div className="col-span-11 py-4 px-4 border-r">
        <h2 className="text-3xl">Настройки</h2>
        {children}
      </div>
    </div>
  );
};

export default SettingsPage;
