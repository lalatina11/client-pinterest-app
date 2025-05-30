import { useAuthStore } from "@/utils/zustandStores";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib";

interface Props {
  username: string;
  isFollowing: boolean;
}
const FollowButton = (props: Props) => {
  const { currentUser } = useAuthStore();
  const { isFollowing, username } = props;

  const queryClient = useQueryClient();

  const mutaion = useMutation({
    mutationFn: async ({ username }: { username: string }) => {
      const { data } = await apiRequest.post("/api/users/follow/" + username);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
      toast(
        isFollowing ? "Sukses Unfollow Pengguna" : "Sukses Follow Pengguna"
      );
    },
    onError: () => {
      toast(
        isFollowing
          ? "Gagal Unfollow pengguna ini"
          : "Gagal Follow pengguna ini"
      );
    },
  });

  if (!currentUser || currentUser.name === username) return null;

  return (
    <Button
      onClick={() => mutaion.mutate({ username })}
      disabled={mutaion.isPending}
    >
      {!isFollowing ? "Follow" : "Unfollow"}
    </Button>
  );
};

export default FollowButton;
