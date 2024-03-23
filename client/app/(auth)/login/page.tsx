"use client";

import { z } from "zod";
import axios from "axios"
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginForm, registerForm } from "@/types/forms/authForms";

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
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const LoginPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth()
  const router = useRouter()

  const form = useForm<z.infer<typeof loginForm.formSchema>>({
    resolver: zodResolver(loginForm.formSchema),
    defaultValues: loginForm.defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof loginForm.formSchema>) => {
    setIsLoading(true)
    
    try {
      const res = await axios.post(config.api.auth.login, data);
      setUser({
        _id: res.data.user._id,
        username: res.data.user.username,
        role: res.data.user.role,
        avatar: res.data.user.avatar,
        email: res.data.user.email,
        profileInfo: res.data.user.profileInfo,
        links: res.data.user.links,
        fullName: res.data.user.fullName
      }, res.data.access_token)
      toast.success("Мы скучали!", { icon: "🤗" })
      router.replace("/")
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
        className="px-6 py-6 w-[90%]"
      >
        <div className="py-2">
          <h1 className="font-semibold text-2xl">Авторизация</h1>
        </div>
        <title>y . авторизация</title>
        <div className="space-y-2">
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
            ) : "Войти"}
            </Button>
            <Link href="/register" className="text-blue-400 text-sm font-medium hover:text-blue-700 transition duration-300">
              У меня нет аккаунта
            </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginPage;
