"use client";

import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { PenLine } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { tweetFormData } from "@/types/forms/tweetForm";
import { z } from "zod";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { config } from "@/config";

const TweetForm = () => {
  const { user } = useAuth();

  const form = useForm<z.infer<typeof tweetFormData.tweetSchema>>({
    resolver: zodResolver(tweetFormData.tweetSchema),
    defaultValues: tweetFormData.defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof tweetFormData.tweetSchema>) => {
    const data = { ...values, author: user?._id };

    try {
        const res = await axios.post(config.api.tweet.create, data);
        console.log(res)
    } catch (error) {
        console.error(error)
    }

  };

  return (
    <div className="py-4 px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Как прошёл ваш день?"
                    className="resize-none"
                    maxLength={140}
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-2">
            <hr />
          </div>
          <div className="ml-auto w-fit">
            <Button 
                className="flex gap-2 hover:bg-black hover:text-white" 
                size="lg"
                variant="outline"
            >
              <PenLine className="size-4" /> Отправить
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TweetForm;
