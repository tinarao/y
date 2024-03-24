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
  isAuthor?: boolean;
}

const TweetsOnProfile = ({ tweet, query, isAuthor }: TOPProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(
    tweet.peopleWhoLiked.includes(user?._id as string)
  );
  const createdAt = new Date(tweet.createdAt).toLocaleString()

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

  const onTweetLike = async (tweet: Tweet) => {
    setLoading(true);
    if (tweet.peopleWhoLiked.includes(user?._id as string)) {
      try {
        const response = await axios.patch(
          `${config.api.tweet.removeLike}/${tweet._id}/${user?._id}`
        );
        if (response.status !== 200) {
          toast.error("Произошла ошибка, попробуйте ещё раз", { icon: "😔" });
        } else {
          setIsLiked(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Произошла ошибка, попробуйте ещё раз");
      }
    } else {
      try {
        const response = await axios.patch(
          `${config.api.tweet.like}/${tweet._id}/${user?._id}`
        );
        if (response.status !== 200) {
          toast.error("Произошла ошибка, попробуйте ещё раз", { icon: "😔" });
        } else {
          setIsLiked(true);
        }
      } catch (error) {
        console.error(error);
        toast.error("Произошла ошибка, попробуйте ещё раз");
      }
    }
    setLoading(false);
    query.refetch();
  };

  return (
    <div className="border rounded-lg">
      <h3 className="px-4 py-4 text-lg">
        {tweet.text}
      </h3>
      <div className="flex gap-8 items-center border-t px-2 justify-between">
        <div className="flex items-center gap-6">
          <div className="flex gap-2 items-center py-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onTweetLike(tweet)}
              disabled={loading}
            >
              <Heart
                className={`size-4 stroke-black dark:stroke-white ${
                  isLiked
                    ? "fill-red-500 stroke-red-500 dark:stroke-red-500"
                    : ""
                }`}
              />
            </Button>
            {tweet.likes}
          </div>
          <div className="flex gap-2 items-center">
            <Button variant="ghost" size="icon" disabled={loading}>
              <RepeatIcon className="size-4" />
            </Button>
            {tweet.retweets}
          </div>
          {isAuthor && (
            <div>
              <Button
                size="icon"
                variant="ghost"
                type="button"
                onClick={() => onTweetDelete(tweet)}
                disabled={loading}
              >
                <Trash className="size-4" />
              </Button>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xs text-neutral-700">
            {createdAt}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TweetsOnProfile;
