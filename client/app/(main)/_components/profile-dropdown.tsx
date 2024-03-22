import { BookOpenText, Cog, LogOut, MessageCircle } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ProfileDropdown = () => {
  const { user, logOut } = useAuth();
  const router = useRouter()

  const logOutHandler = () => {
    logOut()
    router.replace("/login")
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          className="rounded-full"
          src={user?.avatar ? user?.avatar as string : "/avatarph.png"}
          width={50}
          height={50}
          alt={user?.username ? user?.username as string : "Аватар"}
          priority={true}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/profile/${user?._id}`} className="flex gap-2 cursor-pointer">
            <BookOpenText className="size-4" /> Профиль
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 cursor-pointer">
          <MessageCircle className="size-4" /> Сообщения
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 cursor-pointer" asChild>
          <Link href="/settings">
            <Cog className="size-4" /> Настройки
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logOutHandler}
          className="flex gap-2 cursor-pointer"
        >
          <LogOut className="size-4" /> Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
