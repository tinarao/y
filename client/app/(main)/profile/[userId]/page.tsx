"use client";

import { config } from "@/config";
import { getBearerHeader } from "@/utils/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import TweetsOnProfile from "../../_components/tweets-on-profile";
import useAuth from "@/hooks/useAuth";
import TweetForm from "@/components/TweetForm";
import ProfileInfoContainer from "../../_components/profile-info";
import { Tweet } from "@/types/Tweet";
import NoTweets from "@/components/conditional/NoTweets";
import Loading from "@/components/conditional/Loading";
import ProfileCover from "../../_components/profile-cover";

const ProfilePage = () => {
  const { userId } = useParams();

  const getProfileInfo = async () => {
    const response = await axios.get(
      `${config.api.user.getProfileInfoByID}/${userId}`,
      getBearerHeader()
    );
    return response.data;
  };

  const query = useQuery({
    queryKey: ["todos"],
    queryFn: getProfileInfo,
  });

  const userInfo = query.data;
  const { user } = useAuth();
  const isAuthor = userId === user?.username;
  
  return (
    <div className="container p-0 border-r h-full">
      <title>
        {`y . ${userId}`}
      </title>
      <ProfileCover 
        isAuthor={isAuthor}
        user={userInfo} 
      />
      <div className="grid grid-cols-4 h-full">
        <div className="col-span-1 h-full">
          {query.isPending ? (
            <Loading />
          ) : (
            <ProfileInfoContainer query={query} user={userInfo} isAuthor={isAuthor} />
          )}
        </div>
        <div className="col-span-3 overflow-y-auto h-full">
          {isAuthor && (
            <>
              <div className="py-4 px-8">
                <TweetForm query={query} user={user} />
              </div>
              <hr />
            </>
          )}
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
