"use client";

import Logo from "@/components/Logo";
import { Bell, Flame, MessageCircle, PenLine, Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theming/ThemeToggle";

import Link from "next/link";
import ProfileDropdown from "./profile-dropdown";

const Header = () => {
  return (
    <header className="border-b sticky top-0 px-8 py-2 z-50 bg-white dark:bg-black">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-8">
            <Logo size={5} />
          </div>
          <div>
            <nav className="flex gap-4">
              <Button variant="ghost">
                <Link href="/" className="flex gap-2 items-center">
                  <Telescope className="size-4" /> Главная
                </Link>
              </Button>
              {/* <Button variant="ghost">
                <Link href="/trending" className="flex gap-2 items-center">
                  <Flame className="size-4" /> Горячее
                </Link>
              </Button> */}
            </nav>
          </div>
        </div>
        <div className="flex gap-4 items-center">
        <Button className='flex' size="icon" variant="outline">
            <PenLine className='size-4' />
        </Button>
        {/* <Button className='flex' size="icon" variant="outline">
            <MessageCircle className='size-4' />
        </Button> */}
        <Button className='flex' size="icon" variant="outline">
            <Bell className='size-4' />
        </Button>
        <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
