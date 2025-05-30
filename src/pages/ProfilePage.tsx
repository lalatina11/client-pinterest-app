import BackButton from "@/components/BackButton";
import Boards from "@/components/Boards";
import FollowButton from "@/components/FollowButton";
import Gallery from "@/components/Gallery";
import Avatar from "@/components/UserMenu/Avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiRequest } from "@/lib";
import type { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { FaShareAlt } from "react-icons/fa";
import { useParams } from "react-router";
import { toast } from "sonner";

interface DataFromApiType {
  user: User;
  followerCount: number;
  isFollowing: boolean;
  followingCount: number;
}

const ProfilePage = () => {
  const { username } = useParams();
  const [mode, setMode] = useState<"created" | "saved">("created");
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      const { data } = await apiRequest.get("/api/users/get-user/" + username);
      return data;
    },
  });

  if (isLoading)
    return (
      <h1 className="flex justify-center items-center text-xl font-semibold">
        Loading...
      </h1>
    );
  if (error)
    return (
      <h1 className="flex justify-center items-center text-xl font-semibold">
        {error.message}
      </h1>
    );
  const { user, followerCount, followingCount, isFollowing } =
    data as DataFromApiType;

  return (
    <div className="flex flex-col gap-6 justify-center items-center w-full">
      <BackButton className="w-fit mr-auto" />
      <Card className="flex justify-center items-center max-w-sm w-sm mx-auto Card">
        <CardHeader className="flex flex-col gap-4 justify-center items-center w-full">
          <CardTitle>
            <Avatar
              avatarUrl={user.avatar}
              className="w-14 h-14 object-cover"
            />
          </CardTitle>
          <CardDescription>
            <p>@{user.username}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-center items-center gap-2">
            {user.name}
            <CardDescription>
              <div className="flex gap-2 items-center">
                <span>{followerCount} Follower</span>
                <span>{followingCount} Following</span>
              </div>
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex w-full justify-around gap-4 items-center">
          <Button
            onClick={() => toast("Profile " + username + " berhasil dibagikan")}
          >
            <FaShareAlt />
          </Button>
          <FollowButton isFollowing={isFollowing} username={username || ""} />
          {/* <Button
            hidden={!currentUser || currentUser.name === username}
            onClick={() => toast("Profile " + username + " berhasil blokir")}
          >
            Block
          </Button> */}
          <Button onClick={() => toast("Fitur ini segera hadir")}>
            <CiCircleMore />
          </Button>
        </CardFooter>
      </Card>
      <div className="flex justify-center items-center gap-5 font-semibold">
        <span
          onClick={() => setMode("created")}
          className={`border-b-2 pb-1 transition-all ease-in-out duration-300 hover:text-zinc-500 ${
            mode === "created"
              ? "border-zinc-500 cursor-default"
              : "border-transparent cursor-pointer"
          }`}
        >
          Created
        </span>
        <span
          onClick={() => setMode("saved")}
          className={`border-b-2 pb-1 transition-all ease-in-out duration-300 hover:text-zinc-500 ${
            mode === "saved"
              ? "border-zinc-500 cursor-default"
              : "border-transparent cursor-pointer"
          }`}
        >
          Saved
        </span>
      </div>
      <div className="my-4">
        {mode === "created" ? (
          <Gallery userId={data.user._id} />
        ) : (
          <Boards userId={data.user._id} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
