import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { User } from "@/types/User";
import useAuth from "@/hooks/useAuth";
import { UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { config } from "@/config";
import { UserCheck } from "lucide-react";

interface SBProps {
  children: React.ReactNode;
  target: User;
  query: UseQueryResult<any, Error>;
}

const SubscribeButton = ({ children, target, query }: SBProps) => {
  const { user } = useAuth();
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);

  useEffect(() => {
    if (user?.subscribedTo.includes(target._id)) {
      setIsAlreadySubscribed(true);
      return;
    }
  });

  const subscriptionHandler = async () => {
    const payload = {
      target: target.username,
      subscriber: user!.username,
    };

    if (isAlreadySubscribed) {
      const res = await axios.patch(config.api.user.unsubscribe, payload);
      if (res.status !== 200) {
        toast.error("Упс, ошибочка произошла");
      } else {
        setIsAlreadySubscribed(false);
        query.refetch();
      }
    } else {
      const res = await axios.patch(config.api.user.subscribe, payload);
      if (res.status !== 200) {
        toast.error("Упс, ошибочка произошла");
      } else {
        setIsAlreadySubscribed(true);
        query.refetch();
      }
    }
  };

  return isAlreadySubscribed ? (
    <Button
      onClick={subscriptionHandler}
      variant="outline"
      className="w-full inline-flex gap-2 hover:bg-red-500 hover:text-white"
    >
      <UserCheck className="size-4" /> Вы подписаны!
    </Button>
  ) : (
    <Button className="w-full" onClick={subscriptionHandler}>
      {children}
    </Button>
  );
};

export default SubscribeButton;
