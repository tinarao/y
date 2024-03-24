import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";
import { v4 } from "uuid";
import Loading from "@/components/conditional/Loading";
import useAuth, { userStoreType } from "@/hooks/useAuth";
import { toast } from "sonner";
import axios from "axios";
import { config } from "@/config";

const CoverUploadDialog = ({ children, user }: { children: React.ReactNode, user: userStoreType }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { setBackground } = useAuth();
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [maxSizeError, setMaxSizeError] = useState<string | undefined>(
    undefined
  );

  const sendBackgroundToBackend = async (pic: string) => {
    const res = await axios.patch(`${config.api.user.updateCover}/${user.username}`, {
      background: pic,
      username: user.username
    })
    return res
  }

  const onSubmit = () => {
    if (!fileRef.current?.files) return;
    const file = fileRef.current?.files[0];
    if (file.size > 2200000) {
      setMaxSizeError("Слишком большой файл!");
      return;
    } else {
      setMaxSizeError(undefined);
    }

    // uploading to firebase
    const storage = getStorage(app);
    const name = v4();
    const pathToFile = `img/users/${name}_${file.name}`;
    const storageRef = ref(storage, pathToFile);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        return error;
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          try {
            const res = sendBackgroundToBackend(downloadURL)
            setBackground(downloadURL)
            toast.success("Обложка загружена!", { icon: "🎉" })
          } catch (error) {
            console.log(error);
            toast.error("Произошла ошибка, попробуйте позже");
            return;
          }

          setProgress(undefined);
          return;
        });
      }
    );
    // end uploading
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Обновление профиля</DialogTitle>
          <DialogDescription>
            Подчеркните свою уникальность и самовыразитесь, используя файлы, не
            превышающие 2 Мб.
          </DialogDescription>
        </DialogHeader>
        {progress !== undefined && (
          <div className="text-center">
            <Loading py="8" />
            <span>Загружено {progress}%</span>
          </div>
        )}
        <div>
          <Input
            type="file"
            max={1}
            ref={fileRef}
            className={maxSizeError ? "border-2 border-red-500" : ""}
          />
          {maxSizeError && (
            <span className="text-sm font-medium text-red-500">
              {maxSizeError}
            </span>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" variant="outline" onClick={onSubmit}>
            Загрузить и сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CoverUploadDialog;
