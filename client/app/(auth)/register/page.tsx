"use client";

import { z } from "zod";
import axios from "axios"
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerForm } from "@/types/forms/authForms";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { config } from "@/config";
import { toast } from "sonner";
import Link from "next/link";

const RegisterPage = () => {

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerForm.formSchema>>({
    resolver: zodResolver(registerForm.formSchema),
    defaultValues: registerForm.defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof registerForm.formSchema>) => {
    setIsLoading(true)
    
    try {
      const res = await axios.post(config.api.auth.register, data);
      toast.success(`Пользователь ${res.data.username} зарегистрирован!`)
    } catch (error) {
      // @ts-ignore
      toast.error(error.response?.data.message)
    }

    setIsLoading(false)
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-6 py-6"
      >
        <div className="py-2">
          <h1 className="font-semibold text-2xl">Регистрация</h1>
        </div>
        <title>y . регистрация</title>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя пользователя</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="tinarao" disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес электронной почты</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="example@y.ru" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="py-4">
          <hr />
        </div>
        <div className="flex items-center justify-between">
          <Button size="lg" variant="outline" disabled={isLoading} className="w-48">
            {isLoading ? (
              <Loader2Icon className="animate-spin size-4" />
            ) : "Зарегистрироваться"}
            </Button>
            <Link href="/login" className="text-blue-400 text-sm font-medium hover:text-blue-700 transition duration-300">
              У меня есть аккаунт
            </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterPage;
