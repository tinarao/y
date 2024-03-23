import { Button } from "@/components/ui/button";
import { config } from "@/config";
import useAuth, { userStoreType } from "@/hooks/useAuth";
import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CoverDeleteButton = () => {

  const { user, setBackground } = useAuth();
  const [loading, setLoading] = useState(false);

  const coverDeleteHandler = async () => {
    setLoading(true)
    try {
      const res = await axios.patch(config.api.user.editProfile, {
        background: undefined,
        user: user?._id!
      })
      console.log(res)
      setBackground("")

    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка, попробуйте позже")
    }
    setLoading(false)
    return;
  }

  return (
    <Button
      disabled={loading}
      onClick={coverDeleteHandler}
      className="bg-white/50 text-black-600 hover:bg-red-500 hover:text-white"
    >
      <Trash className="size-4 mr-2" /> Удалить
    </Button>
  );
};

export default CoverDeleteButton;
