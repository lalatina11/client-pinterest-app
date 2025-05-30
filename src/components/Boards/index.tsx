import { apiRequest } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import ImageRenderer from "../Gallery/ImageRenderer";
import { format } from "timeago.js";
import { NavLink } from "react-router";

interface Props {
  userId: string | null;
}

interface Board {
  createdAt: string;
  title: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
  firstPin: { media: string; title: string; createdAt: string };
  pinCount: number;
}

const Boards = (props: Props) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["board", props.userId],
    queryFn: async () => {
      const { data } = await apiRequest.get("/api/boards/" + props.userId);
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

  const boards = data.boards as Board[];

  if (boards.length < 1 || !data.board)
    return (
      <h1 className="flex justify-center items-center">
        Pengguna Belum memiliki Postingan yang disimpan
      </h1>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4">
      {/* Collections */}
      {boards.map((board: Board) => (
        <NavLink
          to={`/search?boardId=${board._id}`}
          key={board._id}
          className="flex flex-col gap-2 justify-between"
        >
          <ImageRenderer
            className="w-full h-auto object-cover rounded-md flex-1"
            imageUrl={board.firstPin.media}
          />
          <div className="flex flex-col">
            <span>Minimalist Bedroom</span>
            <span>
              {board.pinCount || 0} Pins 𐄙 {format(board.createdAt)}
            </span>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Boards;
