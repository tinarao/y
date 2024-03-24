"use client";

import React, { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { PenLine } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { tweetFormData } from "@/types/forms/tweetForm";
import { z } from "zod";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { Tweet } from "@/types/Tweet";
import axios from "axios";
import { userStoreType } from "@/hooks/useAuth";
import { config } from "@/config";
import { toast } from "sonner";

interface Inputs {
  text: string;
}

const TweetForm = ({
  query,
  user,
}: {
  query: UseQueryResult<any, Error>;
  user: userStoreType | undefined;
}) => {

  const onSubmit: SubmitHandler<Inputs> = async (values) => {


    const data = {
      ...values,
      author: user?._id,
      createdAt: new Date().getTime(),
    };

    if (watch("text").length === 0) {
      return setError("Твит не может быть пустым!");
    }

    try {
      const res = await axios.post(config.api.tweet.create, data);
      toast.success("Твит сохранён!")
      query.refetch();
    } catch (error) {
      console.error(error);
      toast.success("Упс... произошла ошибка :(")
    }
  };

  const { register, handleSubmit, watch } = useForm<Inputs>();
  const [error, setError] = useState("");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Textarea
          placeholder="Как прошёл ваш день?"
          className={`resize-none text-lg ${
            error && "border-2 border-red-500 shadow-md shadow-red-100"
          }`}
          maxLength={140}
          rows={4}
          {...register("text")}
        />
        {error && (
          <span className="font-medium text-sm text-red-500">{error}</span>
        )}
      </div>
      <div className="ml-auto w-fit pt-2">
        <Button
          className="flex gap-2 hover:bg-black hover:text-white"
          size="lg"
          variant="outline"
        >
          <PenLine className="size-4" /> Отправить
        </Button>
      </div>
    </form>
  );
};

export default TweetForm;
