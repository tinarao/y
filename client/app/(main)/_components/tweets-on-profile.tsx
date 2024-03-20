import { Button } from "@/components/ui/button";
import { config } from "@/config";
import useAuth from "@/hooks/useAuth";
import { Tweet } from "@/types/Tweet";
import { UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { Heart, RepeatIcon, Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface TOPProps {
  tweets: Tweet[];
  query: UseQueryResult<any, Error>;
}

const TweetsOnProfile = ({ tweets, query }: TOPProps) => {
  tweets = tweets.toReversed();
  const { user } = useAuth();

  const onTweetDelete = async (tweet: Tweet) => {
    if (user?._id !== tweet.author) {
      return toast.error("Доступ запрещён!");
    }
    
    try {
      const res = await axios.delete(`
        ${config.api.tweet.delete}/${tweet._id}
      `);
      if (res.status !== 200) {
        toast.error("Ошибка при удалении, простите", { icon: "😔" });
      } else {
        toast.success("Твит удалён!", { icon: "🎉" });
      }
    } catch (error) {
      toast.error("Ошибка при удалении, простите", { icon: "😔" });
    }
    query.refetch();
  };

  return (
    <div className="my-2 flex flex-col gap-4">
      {tweets.map((i) => (
        <div key={i._id} className="p-2 border">
          <h3>{i.text}</h3>
          <p>
            {i.likes} / {i.retweets}
          </p>
          <div>
            <div className="flex gap-8 items-center">
              <div className="flex gap-2 items-center py-1">
                <Button variant="outline" size="icon">
                  <Heart className="size-4" />
                </Button>
                {i.likes}
              </div>
              <div className="flex gap-2 items-center">
                <Button variant="outline" size="icon">
                  <RepeatIcon className="size-4" />
                </Button>
                {i.retweets}
              </div>
              <div>
                <Button
                  size="icon"
                  variant="outline"
                  className="hover:bg-red-500 hover:text-white"
                  type="button"
                  onClick={() => onTweetDelete(i)}
                >
                  <Trash className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TweetsOnProfile;
