import { apiRequest } from "@/lib";
import { type Comment as CommentType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";

interface Props {
  pinId: string;
}

const Comments = (props: Props) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["comments", props.pinId],
    queryFn: async () => {
      const { data } = await apiRequest.get(
        "/api/comments?pinId=" + props.pinId
      );
      return data.data as CommentType[];
    },
  });

  if (isLoading) return <h1>Loading..</h1>;
  if (error) return <h1>{error.message}</h1>;

  if (!data) return <h1>Belum ada komentar di postingan ini</h1>;

  return (
    <div className="flex-1 flex flex-col gap-6 md:gap-0 h-full justify-between">
      {/* Commnents List */}
      <div className="flex flex-col gap-2 max-h-[100vh] p-2 md:max-h-[40vh] lg:max-h-[100vh] overflow-y-auto h-full">
        <span className="text-xs lg:text-sm flex gap-2">
          {data.length || 0}
          <span className="text-zinc-500 mb-4">Comments</span>
        </span>
        {data.map((item) => (
          <Comment comment={item} key={item._id} />
        ))}
      </div>
      <div className="w-full h-[1px] mb-4 bg-zinc-500" />
      {/* Add Comment */}
      <AddCommentForm pinId={props.pinId} />
    </div>
  );
};

export default Comments;
