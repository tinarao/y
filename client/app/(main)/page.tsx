"use client";

import Loading from "@/components/conditional/Loading";
import { config } from "@/config";
import useAuth from "@/hooks/useAuth";
import { Tweet } from "@/types/Tweet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TweetsOnProfile from "./_components/tweets-on-profile";
import TweetCard from "./_components/tweet-card";

const MainPage = () => {
  const { user } = useAuth();

  const getSubscribedTweets = async () => {
    const res = await axios.get(
      `${config.api.tweet.getTweetsByFollowingAuthors}/${user!.username}`
    );
    return res.data;
  };

  const query = useQuery({
    queryKey: ["tweets-by-following-authors"],
    queryFn: getSubscribedTweets,
  });

  return (
    <div className="container">
      <div className="w-[70%] mx-auto space-y-4 py-4">
        {query.isPending ? (
          <Loading />
        ) : (
          query.data.map((i: Tweet) => (
            <TweetCard key={i._id} tweet={i} query={query} />
          ))
        )}
      </div>
    </div>
  );
};

export default MainPage;
