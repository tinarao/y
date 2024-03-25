import TweetForm from "@/components/TweetForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAuth from "@/hooks/useAuth";

const TweetFormDialog = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="pt-12">
        <TweetForm user={user} />
      </DialogContent>
    </Dialog>
  );
};

export default TweetFormDialog;
