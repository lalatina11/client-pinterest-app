import { useEditorStore } from "@/utils/zustandStores";
import type { ImageEditorProps } from ".";
import { Trash2 } from "lucide-react";
import { useEffect, useRef, useState, type MouseEventHandler } from "react";

const WorkSpace = (props: ImageEditorProps) => {
  const { previewImage } = props;
  const {
    setSelectedLayer,
    textOption,
    setTextOption,
    canvasOption,
    setCanvasOption,
  } = useEditorStore();

  useEffect(() => {
    if (canvasOption.height === 0) {
      const canvasHeight = (375 * previewImage.height) / previewImage.width;
      setCanvasOption({
        ...canvasOption,
        height: canvasHeight,
        orientation: canvasHeight > 375 ? "portrait" : "landscape",
      });
    }
  }, [previewImage, canvasOption, setCanvasOption, previewImage.url]);

  const itemRef = useRef(null);
  const containerRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (dragging) {
      setTextOption({
        ...textOption,
        left: e.clientX - offset.current.x,
        top: e.clientY - offset.current.y,
      });
    }
  };
  const handleMouseUp = () => {
    setDragging(false);
  };
  const handleMouseLeave = () => {
    setDragging(false);
    console.log("Mouse Leave");
  };
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    setSelectedLayer("text");
    setDragging(true);
    offset.current = {
      x: e.clientX - textOption.left,
      y: e.clientY - textOption.top,
    };
  };

  return (
    <div className="flex-3/5 flex justify-center items-center bg-zinc-200/50 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 py-16">
      <div
        className="w-[375px] relative overflow-hidden no-rounded flex justify-center items-center"
        style={{
          height: canvasOption.height,
          backgroundColor: canvasOption.backgroundColor,
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
      >
        <img
          src={previewImage.url}
          height={previewImage.height}
          width={previewImage.width}
          alt=""
          className="w-full h-auto"
        />
        {textOption.text ? (
          <div
            className="absolute z-[99] max-w-full border-red-500 border-dashed flex gap-2 items-center"
            style={{
              left: textOption.left,
              top: textOption.top,
              fontSize: `${textOption.fontSize}px`,
            }}
            onMouseDown={handleMouseDown}
            ref={itemRef}
          >
            <input
              className={`p-1 px-2 rounded w-full`}
              style={{
                color: textOption.color,
                cursor: dragging ? "grabbing" : "grab",
              }}
              type="text"
              defaultValue={textOption.text}
              onChange={(e) =>
                setTextOption({
                  ...textOption,
                  text: e.target.value as string,
                })
              }
            />
            <div
              className="cursor-pointer absolute -bottom-10 right-3 bg-zinc-200/50 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 w-8 h-8 flex justify-center items-center rounded-full"
              onClick={() => setTextOption({ ...textOption, text: "" })}
            >
              <Trash2 />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WorkSpace;
