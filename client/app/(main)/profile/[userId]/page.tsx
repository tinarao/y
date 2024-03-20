"use client";

import { config } from "@/config";
import { getBearerHeader } from "@/utils/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import TweetsOnProfile from "../../_components/tweets-on-profile";
import useAuth from "@/hooks/useAuth";
import TweetForm from "@/components/TweetForm";

const ProfilePage = () => {
  const getProfileInfo = async () => {
    const response = await axios.get(
      `${config.api.user.getProfileInfoByID}${userId}`,
      getBearerHeader()
    );
    return response.data;
  };

  const { userId } = useParams();
  const query = useQuery({
     queryKey: ["todos"], 
     queryFn: getProfileInfo,
    });

  const userInfo = query.data;
  const { user } = useAuth();

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
                  src={userInfo.avatar}
                  width={200}
                  height={200}
                  className="rounded-full"
                  alt={userInfo.username}
                />
              </div>
              <div>
                <h2 className="text-xl text-center">{userInfo.username}</h2>
                <div className="flex mx-auto w-fit gap-4">
                  {userInfo.subscribers ? (
                    <h3>{userInfo.subscribers.length}</h3>
                  ) : (
                    <div className="flex flex-col items-center">
                      <h5>0</h5>
                      <h5>Подписчики</h5>
                    </div>
                  )}
                  {userInfo.subscribedTo ? (
                    <h3>{userInfo.subscribedTo.length}</h3>
                  ) : (
                    <div className="flex flex-col items-center">
                      <h5>0</h5>
                      <h5>Подписки</h5>
                    </div>
                  )}
                </div>
                <h5>
                  {userInfo.fullName ? (
                    <h5>{userInfo.fullName}</h5>
                  ) : (
                    <p>Добавьте полное имя</p>
                  )}
                </h5>
                {userInfo.profileInfo ? (
                  userInfo.profileInfo
                ) : (
                  <p>Добавьте описание профиля</p>
                )}
                {userInfo.links.length !== 0 ? (
                  userInfo.links.map(({ i }: { i: string }) => (
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
          <div className="py-4 px-8">
            <TweetForm
              query={query}
              user={user}
            />
          </div>
          <hr />
          <div>
            {query.isPending ? (
              <h1>gruzim</h1>
            ) : userInfo?.tweets.length !== 0 ? (
              <div className="px-8">
                <TweetsOnProfile tweets={userInfo?.tweets} />
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
