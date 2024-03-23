"use client";

import Image from "next/image";
import { userStoreType } from "@/hooks/useAuth";
import CoverUploadDialog from "./cover-upload-dialog";
import { Button } from "@/components/ui/button";
import { Camera, ImageIcon, Trash } from "lucide-react";
import CoverDeleteButton from "./cover-delete-button";

const ProfileCoverImage = ({ user }: { user: userStoreType }) => {
  return (
    <div className="h-56 group relative">
      <Image
        className="object-cover"
        loading="lazy"
        fill
        alt={`Фон профиля ${user?.username}`}
        src={user?.background!}
      />
      <div className="z-50 absolute bottom-0 right-0 mx-8 my-2 hidden group-hover:flex group-hover:gap-4 transition duration-200">
        <CoverDeleteButton />
        <CoverUploadDialog>
          <Button className="bg-white/50 text-black-600 hover:bg-white">
            <ImageIcon className="size-4 mr-2" /> Заменить
          </Button>
        </CoverUploadDialog>
      </div>
    </div>
  );
};

const ProfileCover = ({ user }: { user: userStoreType }) => {
  return (
    <div className="relative border-b border-l">
      {user?.background ? (
        <ProfileCoverImage user={user} />
      ) : (
        <CoverUploadDialog>
          <Button variant="cover" className="w-full flex flex-col h-56">
            <>
              <Camera className="size-12" />
              Загрузить обложку
            </>
          </Button>
        </CoverUploadDialog>
      )}
    </div>
  );
};

export default ProfileCover;
