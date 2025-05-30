import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarShadcn,
} from "../ui/avatar";
import { RxAvatar } from "react-icons/rx";

interface Props {
  className?: string;
  avatarUrl: string;
}

const Avatar = (props: Props) => {
  return (
    <AvatarShadcn className={props.className || "w-8 h-8 object-cover"}>
      <AvatarImage
        className={props.className || "w-8 h-8 object-cover"}
        src={props.avatarUrl}
      />
      <AvatarFallback>
        <RxAvatar className={props.className || "w-8 h-8 object-cover"} />
      </AvatarFallback>
    </AvatarShadcn>
  );
};

export default Avatar;
