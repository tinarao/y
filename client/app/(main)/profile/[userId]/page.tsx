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
    <div className="container p-0 border-l">
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          {query.isPending ? (
            <div>грузим</div>
          ) : (
            <ProfileInfoContainer user={userInfo} />
          )}
        </div>
        <div className="col-span-3 border-x overflow-y-auto">
          <div className="py-4 px-8">
            <TweetForm
              query={query}
              user={user}
            />
          </div>
          <hr />
          <div className="px-8">
            {query.isPending ? (
              <h1>gruzim</h1>
            ) : userInfo?.tweets.length !== 0 ? (
              <div>
                <TweetsOnProfile 
                  tweets={userInfo?.tweets} 
                  query={query}
                />
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
