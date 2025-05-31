import { useEditorStore } from "@/utils/zustandStores";
import type { ImageEditorProps } from ".";
import { Trash2 } from "lucide-react";

const WorkSpace = (props: ImageEditorProps) => {
  const { previewImage } = props;
  const { textOption, setTextOption } = useEditorStore();

  return (
    <div className="flex-3/5 flex justify-center items-center bg-zinc-200/50 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 py-16">
      <div className="w-[90%] relative overflow-hidden no-rounded flex justify-center items-center">
        <img
          src={previewImage.url}
          height={previewImage.height}
          width={previewImage.width}
          alt=""
          className="w-full"
        />
        {textOption.text ? (
          <div
            className="absolute z-[99] max-w-full border-red-500 border-dashed flex gap-2 items-center"
            style={{
              left: textOption.left,
              top: textOption.top,
              fontSize: `${textOption.fontSize}px`,
            }}
          >
            <input
              className={`p-1 px-2 rounded`}
              style={{
                color: textOption.color,
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
