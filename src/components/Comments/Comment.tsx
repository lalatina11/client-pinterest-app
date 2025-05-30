import { NavLink } from "react-router";
import Avatar from "@/components/UserMenu/Avatar";
import { type Comment as CommentType } from "@/types/";
import { format } from "timeago.js";

interface Props {
  comment: CommentType;
}

const Comment = (props: Props) => {
  const { comment } = props;
  return (
    <div key={comment._id}>
      <div className="flex gap-2 items-center justify-between pr-0 md:pr-5 lg:pr-10">
        <NavLink to={`/profile/${comment.user.username}`} className="flex gap-2 items-center">
          <Avatar avatarUrl={comment.user.avatar} />
          <span>{comment.user.name}</span>
        </NavLink>
        <span className="text-xs text-zinc-500">
          {format(comment.createdAt)}
        </span>
      </div>
      <span className="text-xs lg:text-sm">{comment.description}</span>
      <hr className="h-[1px] my-2 bg-zinc-500" />
    </div>
  );
};
export default Comment;
