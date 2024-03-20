"use client";

import TweetForm from "@/components/TweetForm";
import { config } from "@/config";
import { getBearerHeader } from "@/utils/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const getProfileInfo = async () => {
    const response = await axios.get(
      `${config.api.user.getProfileInfoByID}${userId}`,
      getBearerHeader()
    );
    return response.data;
  };

  const { userId } = useParams();
  const query = useQuery({ queryKey: ["todos"], queryFn: getProfileInfo });

  const user = query.data;

  return (
    <div className="container">
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          {query.isPending ? (
            <div>грузим</div>
          ) : (
            <div className="flex flex-col border-r h-full">
              <div className="w-fit mx-auto">
                <Image
                  src={user.avatar}
                  width={200}
                  height={200}
                  className="rounded-full"
                  alt={user.username}
                />
              </div>
              <div>
                <h2 className="text-xl text-center">{user.username}</h2>
                <div className="flex mx-auto w-fit gap-4">
                  {user.subscribers ? (
                    <h3>{user.subscribers.length}</h3>
                  ) : (
                    <div className="flex flex-col items-center">
                      <h5>0</h5>
                      <h5>Подписчики</h5>
                    </div>
                  )}
                  {user.subscribedTo ? (
                    <h3>{user.subscribedTo.length}</h3>
                  ) : (
                    <div className="flex flex-col items-center">
                      <h5>0</h5>
                      <h5>Подписки</h5>
                    </div>
                  )}
                </div>
                <h5>
                  {user.fullName ? (
                    <h5>{user.fullName}</h5>
                  ) : (
                    <p>Добавьте полное имя</p>
                  )}
                </h5>
                {user.profileInfo ? (
                  user.profileInfo
                ) : (
                  <p>Добавьте описание профиля</p>
                )}
                {user.links.length !== 0 ? (
                  user.links.map(({ i }: { i: string }) => (
                    <div key={i}>
                      <Link href={i}>{i}</Link>
                    </div>
                  ))
                ) : (
                  <p>Добавьте ссылки</p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="col-span-3">
          <TweetForm />
          <hr />
          <div>
            {user?.tweets ? (
              <div>
                <h3>twiti est</h3>
              </div>
            ) : (
              <div>
                <h3>twitow net</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
