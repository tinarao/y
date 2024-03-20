import { Button } from "@/components/ui/button";
import { Tweet } from "@/types/Tweet";
import { Heart, RepeatIcon } from "lucide-react";
import React from "react";

const TweetsOnProfile = ({ tweets }: { tweets: Tweet[] }) => {

  tweets = tweets.toReversed()
  
  return (
    <div className="border my-2">
      {tweets.map((i) => (
        <div key={i._id} className="p-2">
          <h3>{i.text}</h3>
          <p>
            {i.likes} / {i.retweets}
          </p>
          <div>
            <div className="flex gap-8">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TweetsOnProfile;
