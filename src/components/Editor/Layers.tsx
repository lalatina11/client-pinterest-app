import { useEditorStore } from "@/utils/zustandStores";
import { TypeOutline } from "lucide-react";
import type { ImageEditorProps } from ".";
import { Label } from "../ui/label";

const Layers = (props: ImageEditorProps) => {
  const { selectedLayer, setSelectedLayer, addText } = useEditorStore();
  return (
    <div className="flex-1/5 flex flex-col gap-3 border-r min-h-screen no-rounded pr-2">
      <div className="flex flex-col">
        <span>Layers</span>
        <span className="text-zinc-500">Pilih Layer</span>
      </div>
      <div
        onClick={() => {
          if (selectedLayer === "canvas") {
            setSelectedLayer("text");
          }
          addText();
        }}
        className={`flex gap-4 items-center w-full cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 p-3 transition-all ease-in-out duration-300 ${
          selectedLayer === "text" ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
      >
        <div>
          <TypeOutline />
        </div>
        <Label className="cursor-pointer">Tambahkan Teks</Label>
      </div>
      <div
        onClick={() => {
          if (selectedLayer === "text") {
            setSelectedLayer("canvas");
          }
        }}
        className={`flex gap-4 items-center w-full cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 p-3 transition-all ease-in-out duration-300 ${
          selectedLayer === "canvas" ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
      >
        <div className="">
          <div
            className="w-5 h-5 square-color"
            style={{ backgroundColor: "teal" }}
          />
        </div>
        <Label className="cursor-pointer">Canvas</Label>
      </div>
    </div>
  );
};

export default Layers;
