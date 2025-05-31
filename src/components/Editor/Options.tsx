import { useEditorStore, type CanvasOption } from "@/utils/zustandStores";
import type { ImageEditorProps } from ".";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useEffect } from "react";
import { IoTabletLandscape, IoTabletPortrait } from "react-icons/io5";

function getContrastYIQ(hexColor: string): string {
  const color = hexColor.replace(/^#/, "");
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000" : "#fff";
}

interface OrientationSize {
  name: string;
  width: number;
  height: number;
}

const portraitSizes = [
  {
    name: "1:2",
    width: 1,
    height: 2,
  },
  {
    name: "9:16",
    width: 9,
    height: 16,
  },
  {
    name: "2:3",
    width: 2,
    height: 3,
  },
  {
    name: "3:4",
    width: 3,
    height: 4,
  },
  {
    name: "4:5",
    width: 4,
    height: 5,
  },
  {
    name: "1:1",
    width: 1,
    height: 1,
  },
];

const landscapeSizes = [
  {
    name: "2:1",
    width: 2,
    height: 1,
  },
  {
    name: "16:9",
    width: 16,
    height: 9,
  },
  {
    name: "3:2",
    width: 3,
    height: 2,
  },
  {
    name: "4:3",
    width: 4,
    height: 3,
  },
  {
    name: "5:4",
    width: 5,
    height: 4,
  },
  {
    name: "1:1",
    width: 1,
    height: 1,
  },
];

const fontSizeSwitcher = [
  {
    name: "Default",
    value: 48,
  },
  {
    name: "12",
    value: 12,
  },
  {
    name: "24",
    value: 24,
  },
  {
    name: "36",
    value: 36,
  },
  {
    name: "44",
    value: 44,
  },
  {
    name: "52",
    value: 52,
  },
  {
    name: "66",
    value: 66,
  },
];

const Options = (props: ImageEditorProps) => {
  const {
    selectedLayer,
    setTextOption,
    textOption,
    canvasOption,
    setCanvasOption,
  } = useEditorStore();
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsColorPickerOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleSwitchSize = (size: CanvasOption["size"] | OrientationSize) => {
    let newHeight = 0;

    if (size === "original") {
      if (
        // FIXED: SHORTEN
        // (originalOrientation === "portrait" &&
        //   canvasOptions.orientation === "portrait") ||
        // (originalOrientation === "landscape" &&
        //   canvasOptions.orientation === "landscape")
        originalOrientation === canvasOption.orientation
      ) {
        newHeight =
          (375 * props.previewImage.height) / props.previewImage.width;
      } else {
        newHeight =
          (375 * props.previewImage.width) / props.previewImage.height;
      }
    } else {
      newHeight =
        (375 * (size as OrientationSize).height) /
        (size as OrientationSize).width;
    }

    setCanvasOption({
      ...canvasOption,
      height: newHeight,
      size: size === "original" ? "original" : (size as OrientationSize).name,
    });
  };

  const originalOrientation =
    props.previewImage.width < props.previewImage.height
      ? "portrait"
      : "landscape";

  const handleSwitchOrientation = (
    orientation: CanvasOption["orientation"]
  ) => {
    let newHeight;

    if (
      // FIXED: SHORTEN
      // (originalOrientation === "portrait" && orientation === "portrait") ||
      // (originalOrientation === "landscape" && orientation === "landscape")
      originalOrientation === orientation
    ) {
      newHeight = (375 * props.previewImage.height) / props.previewImage.width;
    } else {
      newHeight = (375 * props.previewImage.width) / props.previewImage.height;
    }

    setCanvasOption({
      ...canvasOption,
      orientation,
      size: "original",
      height: newHeight,
    });
  };

  return (
    <div className="flex-1/5">
      {selectedLayer === "text" ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Font Size</span>
            <div className="flex flex-wrap gap-2 items-center">
              {fontSizeSwitcher.map((font) => {
                return (
                  <Button
                    key={font.name}
                    disabled={textOption.fontSize === font.value}
                    variant={
                      textOption.fontSize === font.value
                        ? "secondary"
                        : "default"
                    }
                    onClick={() =>
                      setTextOption({ ...textOption, fontSize: font.value })
                    }
                    className="w-max"
                  >
                    {font.name}
                  </Button>
                );
              })}
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="w-12 text-center rounded-md p-1 outline-none border-zinc-500 border-2"
                value={textOption.fontSize.toString()}
                onChange={(e) =>
                  setTextOption({
                    ...textOption,
                    fontSize: Number(e.target.value),
                  })
                }
                name=""
                id="fzInput"
              />
              <Label htmlFor="fzInput">Px</Label>
            </div>
          </div>
          <div className="flex gap-3 items-center relative">
            <div
              className="w-5 h-5 ring-2 ring-zinc-500 cursor-pointer flex flex-col gap-2"
              style={{ backgroundColor: textOption.color }}
              onClick={() => setIsColorPickerOpen((prev) => !prev)}
            />
            <span className="text-sm">
              Text color is{": "}
              <input
                style={{
                  backgroundColor: textOption.color,
                  color: getContrastYIQ(textOption.color),
                }}
                className="rounded-md p-1 w-18 text-center mx-1"
                value={textOption.color}
                defaultValue={textOption.color}
                disabled
              />
            </span>
            {isColorPickerOpen ? (
              <div className="absolute top-7 left-3">
                <HexColorPicker
                  onChange={(color) => setTextOption({ ...textOption, color })}
                  color={textOption.color}
                />
              </div>
            ) : null}
          </div>
          <Button
            onClick={() => setTextOption({ ...textOption, color: "#000000" })}
            className="w-fit"
          >
            Reset Color
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Orientation</span>
            <div className="flex gap-2 items-center">
              {/* <Button
                variant={!canvasOption.orientation ? "secondary" : "default"}
                disabled={!canvasOption.orientation}
                className="p-2 transition-all ease-in-out duration-300"
                onClick={() => handleSwitchOrientation("")}
              >
                Default
              </Button> */}
              <Button
                onClick={() => handleSwitchOrientation("landscape")}
                variant={
                  canvasOption.orientation === "landscape"
                    ? "secondary"
                    : "default"
                }
                disabled={canvasOption.orientation === "landscape"}
                className="p-2 transition-all ease-in-out duration-300"
              >
                <IoTabletLandscape />
              </Button>
              <Button
                onClick={() => handleSwitchOrientation("portrait")}
                variant={
                  canvasOption.orientation === "portrait"
                    ? "secondary"
                    : "default"
                }
                disabled={canvasOption.orientation === "portrait"}
                className="p-2 transition-all ease-in-out duration-300"
              >
                <IoTabletPortrait />
              </Button>
            </div>
          </div>
          <div>
            <span className="font-semibold">Sizes</span>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <Button
              onClick={() => handleSwitchSize("original")}
              variant={
                canvasOption.size === "original" ? "secondary" : "default"
              }
              disabled={canvasOption.size === "default"}
            >
              Default
            </Button>
            {canvasOption.orientation === "portrait" ? (
              <div className="flex gap-3 flex-wrap">
                {portraitSizes.map((item) => (
                  <Button
                    onClick={() => handleSwitchSize(item)}
                    variant={
                      canvasOption.size === item.name ? "secondary" : "default"
                    }
                    disabled={canvasOption.size === item.name}
                    key={item.name}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            ) : canvasOption.orientation === "landscape" ? (
              <div className="flex gap-3 flex-wrap">
                {landscapeSizes.map((item) => (
                  <Button
                    onClick={() => handleSwitchSize(item)}
                    variant={
                      canvasOption.size === item.name ? "secondary" : "default"
                    }
                    disabled={canvasOption.size === item.name}
                    key={item.name}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <span className="font-semibold">Background Color</span>
          </div>
          <div className="flex gap-3 items-center relative">
            <div
              className="w-5 h-5 ring-2 ring-zinc-500 cursor-pointer flex flex-col gap-2"
              style={{ backgroundColor: canvasOption.backgroundColor }}
              onClick={() => setIsColorPickerOpen((prev) => !prev)}
            />
            <input
              style={{
                backgroundColor: canvasOption.backgroundColor,
                color: getContrastYIQ(canvasOption.backgroundColor),
              }}
              className="rounded-md text-sm p-1 w-18 text-center mx-1"
              value={canvasOption.backgroundColor}
              defaultValue={canvasOption.backgroundColor}
              disabled
            />
            {isColorPickerOpen ? (
              <div className="absolute top-7 left-3">
                <HexColorPicker
                  onChange={(color) =>
                    setCanvasOption({ ...canvasOption, backgroundColor: color })
                  }
                  color={canvasOption.backgroundColor}
                />
              </div>
            ) : null}
          </div>
          <Button
            onClick={() =>
              setCanvasOption({ ...canvasOption, backgroundColor: "#008080" })
            }
            className="w-fit"
          >
            Reset Color
          </Button>
        </div>
      )}
    </div>
  );
};

export default Options;
