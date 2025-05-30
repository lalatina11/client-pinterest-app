import type { Pin } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import GalleryItems from "./GalleryItems";

interface Props {
  searchKeyword?: string | null;
  userId?: string | null;
  boardId?: string | null;
}

const Gallery = (props: Props) => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["pins", props.searchKeyword, props.userId],
    queryFn: async ({ pageParam }) => {
      const { data: axiosData } = await axios.get(
        import.meta.env.VITE_API_KEY +
          `/api/pins?cursor=${pageParam}&q=${
            props.searchKeyword || ""
          }&userId=${props.userId || ""}&boardId=${props.boardId || ""}`
      );
      return axiosData;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (status === "pending")
    return <h1 className="flex justify-center items-center">Loading</h1>;
  if (status === "error")
    return (
      <h1 className="flex justify-center items-center">An error occured</h1>
    );

  const allPins =
    data.pages.flatMap((page) => page.data as Pin[]) || ([] as Pin[]);

  if (allPins.length < 1)
    return (
      <h1 className="flex justify-center items-center text-lg font-semibold">
        Belum ada Postingan
      </h1>
    );

  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <h1 className="flex justify-center items-center my-6">
          Memuat Postingan lain
        </h1>
      }
      endMessage={
        <h1 className="flex justify-center items-center my-6">
          Semua Postingan telah dimuat
        </h1>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 auto-rows-[10px] p-2 lg:p-4">
        {allPins.map((data) => (
          <GalleryItems item={data} itemId={data._id || 0} key={data._id} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery;
