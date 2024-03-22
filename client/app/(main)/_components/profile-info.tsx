import { Button } from "@/components/ui/button";
import InfoButton from "@/components/ui/info-button";
import { Label } from "@/components/ui/label";
import { User } from "@/types/User";
import { Globe, Info, PlusCircle, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProfileInfoContainer = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col items-center border-x h-full">
      <div className="w-fit mx-auto pt-4">
        <Image
          src={user.avatar}
          width={200}
          height={200}
          className="rounded-full"
          alt={user.username}
        />
      </div>
      <div className="">
        <h2 className="text-xl text-center font-semibold py-2">
          {user.username}
        </h2>
        <div className="flex mx-auto w-fit gap-4">
          {user.subscribers ? (
            <div className="py-4 text-sm">
              <div className="flex gap-8">
                <div className="flex">
                  <Link href="/" className="mr-1 font-bold">
                    {user.subscribers.length}
                  </Link>{" "}
                  подписчиков
                </div>
                <div className="flex">
                  <Link href="/" className="mr-1 font-bold">
                    {user.subscribedTo?.length}
                  </Link>{" "}
                  подписок
                </div>
              </div>
            </div>
          ) : (
            <h3>0</h3>
          )}
        </div>
        <div className="px-4 space-y-2">
          {user.fullName ? (
            <h5 className="text-md font-medium">{user.fullName}</h5>
          ) : (
            <div className="w-full">
              <InfoButton asChild>
                <Link href="/settings">
                  <PlusCircle className="size-4" /> Добавьте полное имя
                </Link>
              </InfoButton>
            </div>
          )}
          {user.profileInfo ? (
            <p>{user.profileInfo}</p>
          ) : (
            <div className="w-full">
              <InfoButton asChild>
                <Link href="/settings">
                  <PlusCircle className="size-4" /> Добавьте описание профиля
                </Link>
              </InfoButton>
            </div>
          )}
          <hr />
          {user?.links.length !== 0 ? (
            user?.links.map((i) => (
              <div key={i}>
                <Link
                  href={i}
                  className="flex items-center text-blue-500 line-clamp-1 underline hover:text-blue-800 transition"
                >
                  <Globe className="size-6 text-gray-500 mr-2" />
                  <span className="line-clamp-1">{i}</span>
                </Link>
              </div>
            ))
          ) : (
            <div className="w-full">
              <InfoButton asChild>
                <Link href="/settings">
                  <PlusCircle className="size-4" /> Добавьте ссылки
                </Link>
              </InfoButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoContainer;
