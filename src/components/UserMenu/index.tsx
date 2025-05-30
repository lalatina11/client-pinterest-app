import { Link } from "react-router";
import { buttonVariants } from "../ui/button";
import UserDropDown from "./UserDropDown";
import Avatar from "./Avatar";
import { useAuthStore } from "@/utils/zustandStores";

const UserMenu = () => {
  const { currentUser } = useAuthStore();
  return currentUser ? (
    <div className={"flex gap-4 items-center"}>
      <Avatar className="hidden md:block" avatarUrl={currentUser.avatar} />
      <UserDropDown />
    </div>
  ) : (
    <div>
      <Link
        to="/auth?type=login"
        className={"" + buttonVariants({ variant: "default" })}
      >
        Login
      </Link>
    </div>
  );
};

export default UserMenu;
