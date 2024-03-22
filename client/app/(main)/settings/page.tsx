"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/config";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface Inputs {
  fullName?: string
  profileInfo?: string
  links: string
}

const ProfileInfoSettingsPage = () => {

  const { user } = useAuth();
  const { register, handleSubmit } = useForm<Inputs>()

  const editProfileHandler: SubmitHandler<Inputs> = async (data) => {
    const payload = {
      user: user?._id,
      data: data
    }

    try {
      const res = await axios.patch(config.api.user.editProfile, payload)
      console.log(res)
    } catch (error) {
      console.error(error)
      toast.error("Произошла ошибка, попробуйте ещё раз")
    }

    console.log(payload)
  }

  return (
    <div className="py-4">
      <h3 className="text-lg">Настройки профиля</h3>
      <hr />
      <form className="py-4 space-y-4 w-[75%]" onSubmit={handleSubmit(editProfileHandler)}>
        <div>
          <Label>
            Вы можете указать своё полное имя - другим пользователем будет легче
            найти ваш профиль
          </Label>
          <Input {...register("fullName")} placeholder="Полное имя" />
        </div>
        <div>
          <Label>Расскажите о себе - чем занимаетесь, чем и зачем живёте</Label>
          <Textarea {...register("profileInfo")} placeholder="Родился в Москве, в семидесятых, на краю города..." />
        </div>
        <div>
          <Label>
            Добавьте пару ссылок - на соцсети, на личный сайт - куда угодно в
            рамках закона
          </Label>
          <Input {...register("links")} placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
          <div className="py-2">
            {user?.links.length !== 0 ? (
              user?.links.map((i) => <h3 key={i}>{i}</h3>)
            ) : (
              <h5 className="text-sm font-medium">
                Сейчас в вашем профиле нет ни одной ссылки
              </h5>
            )}
          </div>
          <hr />
          <Button className="my-4" variant="outline">
            Сохранить изменения
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoSettingsPage;
