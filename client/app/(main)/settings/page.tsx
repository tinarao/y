"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/config";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { Plus, Save } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ProfileInfoSettingsPage = () => {
  const { user } = useAuth();

  const [profileInfoValue, setProfileInfoValue] = useState(user?.profileInfo)

  const handleProfileChanges = (state: string | undefined) => {

    console.log(state)

  }

  // TODO: REWORK FORM

  return (
    <div className="py-4">
      <h3 className="text-lg">Настройки профиля</h3>
      <hr />
      <div className="py-4 space-y-4 w-[75%]">
        <div>
          <Label>
            Вы можете указать своё полное имя - другим пользователем будет легче
            найти ваш профиль
          </Label>
          <div className="flex gap-4">
            <Input placeholder="Полное имя" />
            {/* <Button type="button" variant="outline" size="icon">
              <Save className="size-6" />
            </Button> */}
          </div>
        </div>
        <div>
          <Label>Расскажите о себе - чем занимаетесь, чем и зачем живёте</Label>
          <div className="flex gap-4">
            <Textarea
              value={profileInfoValue}
              onChange={(e) => setProfileInfoValue(e.target.value)}
              placeholder="Родился в Москве, в семидесятых, на краю города..."
            />
            {/* <Button type="button" variant="outline" size="icon">
              <Save className="size-6" />
            </Button> */}
          </div>
        </div>
        <div>
          <Label>
            Добавьте пару ссылок - на соцсети, на личный сайт - куда угодно в
            рамках закона
          </Label>
          <div className="flex gap-4">
            <Input
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            />
            {/* <Button type="button" variant="outline" size="icon">
              <Save className="size-6" />
            </Button> */}
          </div>
          <div className="py-2">
            {user?.links.length !== 0 ? (
              user?.links.map((i) => (
                <Button key={i} asChild variant="info">
                  <Link href={i}>
                    {i}
                  </Link>
                </Button>
              ))
            ) : (
              <h5 className="text-sm font-medium">
                Сейчас в вашем профиле нет ни одной ссылки
              </h5>
            )}
          </div>
          <hr />
          <Button className="my-4" onClick={handleProfileChanges}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoSettingsPage;
