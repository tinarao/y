"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    BookOpenText,
    Cog,
    Flame,
    LogOut,
    MessageCircle,
    Telescope,
  } from "lucide-react";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/theming/ThemeToggle";
import { Button } from "@/components/ui/button";

import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="border-b sticky top-0 px-8 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-8">
            <Logo size={5} />
          </div>
          <div>
            <nav className="flex gap-4">
              <Button variant="ghost">
                <Link href="/" className="flex gap-2 items-center">
                  <Telescope className="size-4" /> Открытия
                </Link>
              </Button>
              <Button variant="ghost">
                <Link href="/" className="flex gap-2 items-center">
                  <Flame className="size-4" /> Горячее
                </Link>
              </Button>
            </nav>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                className="rounded-full"
                src={user?.avatar as string}
                width={50}
                height={50}
                alt={user?.username as string}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-2">
                <BookOpenText className="size-4" /> Профиль
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2">
                <MessageCircle className="size-4" /> Сообщения
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2">
                <Cog className="size-4" /> Настройки
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-2">
                <LogOut className="size-4" /> Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
