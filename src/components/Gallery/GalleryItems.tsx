import { CiCircleMore, CiSaveDown2 } from "react-icons/ci";
import { FaShareAlt } from "react-icons/fa";
import { NavLink } from "react-router";
import "./galleryItems.css";
import ImageRenderer from "./ImageRenderer";
import type { Pin } from "@/types";

interface Props {
  item: Pin;
  itemId: string | number;
}
const GalleryItems = (props: Props) => {
  const { item, itemId } = props;

  const Imagewidth = 372;

  const optimizeHeight = (Imagewidth * item.height) / item.width;

  return (
    <div
      className="relative flex transition-all ease-in-out duration-300 cursor-pointer galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <ImageRenderer imageUrl={item.media} height={optimizeHeight} />
      <NavLink
        className="overlay absolute top-0 w-full h-full"
        to={`/pin/${itemId}`}
      />
      <div className="overlayBtn gap-4 justify-between items-center bg-zinc-200 dark:bg-zinc-900">
        <span className="hover:scale-125 p-1 lg:p-1.5 rounded-md bg-zinc-900 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-900 transition-all ease-in-out duration-300">
          <FaShareAlt />
        </span>
        <span className="hover:scale-125 p-1.5 rounded-md bg-zinc-900 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-900 transition-all ease-in-out duration-300">
          <CiSaveDown2 />
        </span>
        <span className="hover:scale-125 p-1.5 rounded-md bg-zinc-900 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-900 transition-all ease-in-out duration-300">
          <CiCircleMore />
        </span>
      </div>
    </div>
  );
};

export default GalleryItems;
