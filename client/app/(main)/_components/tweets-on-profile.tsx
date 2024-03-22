import { Button } from "@/components/ui/button";
import { config } from "@/config";
import useAuth from "@/hooks/useAuth";
import { Tweet } from "@/types/Tweet";
import { UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { Heart, RepeatIcon, Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface TOPProps {
  tweet: Tweet;
  query: UseQueryResult<any, Error>;
}

const TweetsOnProfile = ({ tweet, query }: TOPProps) => {
  
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(tweet.peopleWhoLiked.includes(user?._id as string))

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

  const onTweetLike = async(tweet: Tweet) => {

    if (tweet.peopleWhoLiked.includes(user?._id as string)) {
      return toast.error("Нельзя лайкнуть один твит дважды!")
    }

    try {
      const response = await axios.post(`${config.api.tweet.like}/${tweet._id}/${user?._id}`);
      console.log(response)
      if (response.status !== 201) {
        toast.error("Произошла ошибка, попробуйте ещё раз", { icon: "😔" });
      } else {
        toast.success("Твит удалён!", { icon: "🎉" });
        setIsLiked(true)
      }
    } catch (error) {
      console.error(error)
      toast.error("Произошла ошибка, попробуйте ещё раз")
    }
    query.refetch();
  }

  return (
      
        <div key={tweet._id} className="p-2 border">
          <h3>{tweet._id}</h3>
          <h3>{tweet.text}</h3>
          <p>
            {tweet.likes} / {tweet.retweets}
          </p>
          <div>
            <div className="flex gap-8 items-center">
              <div className="flex gap-2 items-center py-1">
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => onTweetLike(tweet)}
                >
                  <Heart className={`size-4 stroke-none ${isLiked ? "fill-red-500" : "stroke-black"}`} />
                </Button>
                {tweet.likes}
              </div>
              <div className="flex gap-2 items-center">
                <Button variant="outline" size="icon">
                  <RepeatIcon className="size-4" />
                </Button>
                {tweet.retweets}
              </div>
              <div>
                <Button
                  size="icon"
                  variant="outline"
                  className="hover:bg-red-500 hover:text-white"
                  type="button"
                  onClick={() => onTweetDelete(tweet)}
                >
                  <Trash className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
  );
};

export default TweetsOnProfile;
