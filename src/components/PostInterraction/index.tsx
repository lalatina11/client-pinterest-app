import { CiCircleMore, CiSaveDown2 } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { useState } from "react";

const PostInterraction = () => {
  const [updateLike, setUpdateLike] = useState({
    isLiked: false,
    likeCount: 0,
  });
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Button
            onClick={() =>
              setUpdateLike((prev) => ({
                isLiked: !prev.isLiked,
                likeCount: prev.isLiked
                  ? prev.likeCount - 1
                  : prev.likeCount + 1,
              }))
            }
          >
            {updateLike.isLiked ? <FaHeart /> : <FaRegHeart />}
          </Button>
          <span>{updateLike.likeCount}</span>
        </div>
        <Button>
          <CiSaveDown2 />
        </Button>
        <Button>
          <CiCircleMore />
        </Button>
      </div>
      <Button>Save</Button>
    </div>
  );
};

export default PostInterraction;
