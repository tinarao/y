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
import ProfileInfoContainer from "../../_components/profile-info";
import { Tweet } from "@/types/Tweet";
import NoTweets from "@/components/conditional/NoTweets";
import Loading from "@/components/conditional/Loading";
import { Camera } from "lucide-react";

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
    <div className="container p-0 border-r h-full">
      <div className="h-56 relative border-b">
        {user?.background ? (
          <Image className="object-cover" loading="lazy" fill alt={`Фон профиля ${user?.username}`} src={user?.background} />
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <h3><Camera className="size-12"/></h3>
            <h5>Загрузите обложку профиля</h5>
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 h-full">
        <div className="col-span-1 h-full">
          {query.isPending ? (
            <Loading />
          ) : (
            <ProfileInfoContainer user={userInfo} />
          )}
        </div>
        <div className="col-span-3 overflow-y-auto h-full">
          <div className="py-4 px-8">
            <TweetForm query={query} user={user} />
          </div>
          <hr />
          <div className="px-8">
            {query.isPending ? (
              <Loading />
            ) : userInfo.tweets.length !== 0 ? (
              <div className="my-2 mt-8 flex flex-col gap-4">
                {userInfo.tweets.toReversed().map((i: Tweet) => (
                  <TweetsOnProfile key={i._id} tweet={i} query={query} />
                ))}
              </div>
            ) : (
              <NoTweets />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
