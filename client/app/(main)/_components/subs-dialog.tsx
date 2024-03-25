import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types/User";
import { Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type variantType = "subs" | "subTo";

interface SDProps {
  children: React.ReactNode;
  variant: variantType;
  data?: User[];
}

const SubscribersDialog = ({ children, variant, data }: SDProps) => {

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {variant === "subs" ? "Подписчики" : "Подписки"}
          </DialogTitle>
          <DialogDescription>
            Список ваших {variant === "subs" ? "подписчиков" : "подписок"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1">
          {data?.map(i => (
            <Link 
                href={`/profile/${i.username}`} 
                key={i._id} 
                className="flex items-center rounded-xl gap-4 my-2 py-2 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            >
                <div>
                    <Image
                        width={50}
                        height={50}
                        src={i.avatar}
                        loading="lazy"
                        alt={i.username}
                        className="rounded-full"
                    />
                </div>
                <div>
                    <h5 className="font-medium">{i.username}</h5>
                </div>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribersDialog;
