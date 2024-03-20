import { Button } from "@/components/ui/button";
import InfoButton from "@/components/ui/info-button";
import { User } from "@/types/User";
import { Info, PlusCircle, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProfileInfoContainer = ({ user }: { user: User }) => {
  console.log(user);

  return (
    <div className="flex flex-col items-center">
      <div className="w-fit mx-auto">
        <Image
          src={user.avatar}
          width={200}
          height={200}
          className="rounded-full"
          alt={user.username}
        />
      </div>
      <div className="">
        <h2 className="text-xl text-center">{user.username}</h2>
        <div className="flex mx-auto w-fit gap-4">
          {user.subscribers ? (
            <div className="py-4 text-sm">
              <p className="flex gap-8">
                <div className="flex">
                <Link href="/" className="mr-1 font-bold">{user.subscribers.length}</Link> подписчиков
                </div>
                <div className="flex">
                <Link href="/" className="mr-1 font-bold">{user.subscribedTo?.length}</Link> подписок
                </div>
              </p>
            </div>
          ) : (
            <h3>0</h3>
          )}
        </div>
        <h5>
          {user.fullName ? (
            <h5>{user.fullName}</h5>
          ) : (
            <InfoButton>
              <PlusCircle className="size-4" /> Добавьте полное имя
            </InfoButton>
          )}
        </h5>
        {user.profileInfo ? (
          user.profileInfo
        ) : (
          <InfoButton>
            <PlusCircle className="size-4" /> Добавьте описание профиля
          </InfoButton>
        )}
        {user?.links.length !== 0 ? (
          user?.links.map((i) => (
            <div key={i}>
              <Link href={i}>{i}</Link>
            </div>
          ))
        ) : (
          <div className="w-full">
            <InfoButton>
              <PlusCircle className="size-4" /> Добавьте ссылки
            </InfoButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfoContainer;
