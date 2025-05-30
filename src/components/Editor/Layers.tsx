import { TypeOutline } from "lucide-react";
import type { ImageEditorProps } from ".";
import { useState } from "react";
import { Label } from "../ui/label";

const Layers = (props: ImageEditorProps) => {
  const [layer, setLayer] = useState<"text" | "canvas" | "">("");
  return (
    <div className="flex-1/5 flex flex-col gap-3 border-r min-h-screen no-rounded pr-2">
      <div className="flex flex-col">
        <span>Layers</span>
        <span className="text-zinc-500">Pilih Layer</span>
      </div>
      <div
        onClick={() => {
          if (layer === "text") {
            setLayer("");
          } else {
            setLayer("text");
          }
        }}
        className={`flex gap-4 items-center w-full cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 p-3 transition-all ease-in-out duration-300 ${
          layer === "text" ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
      >
        <div>
          <TypeOutline />
        </div>
        <Label>Tambahkan Teks</Label>
      </div>
      <div
        onClick={() => {
          if (layer === "canvas") {
            setLayer("");
          } else {
            setLayer("canvas");
          }
        }}
        className={`flex gap-4 items-center w-full cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 p-3 transition-all ease-in-out duration-300 ${
          layer === "canvas" ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
      >
        <div className="">
          <div
            className="w-5 h-5 square-color"
            style={{ backgroundColor: "teal" }}
          />
        </div>
        <Label>Canvas</Label>
      </div>
    </div>
  );
};

export default Layers;
