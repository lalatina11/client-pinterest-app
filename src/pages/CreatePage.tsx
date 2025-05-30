import Editor from "@/components/Editor";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { noImageUrl } from "@/lib/dummyData";
import { useAuthStore } from "@/utils/zustandStores";
import { useEffect, useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { Navigate } from "react-router";
import { toast } from "sonner";

const CreatePage = () => {
  const { currentUser } = useAuthStore();
  const [pinImage, setPinImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState({
    url: "",
    width: 0,
    height: 0,
  });

  const [isEditting, setIsEditting] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pinImage) {
      const image = new Image();
      image.src = URL.createObjectURL(pinImage);
      image.onload = () => {
        setImagePreview({
          url: image.src,
          width: image.width,
          height: image.height,
        });
      };
    }
  }, [pinImage]);

  if (!currentUser) {
    toast("Anda harus login terlebih dahulu");
    return <Navigate to={"/auth?type=login"} />;
  }

  const handlePublish = () => {
    if (isEditting) {
      setIsEditting(false);
    } else {
      toast("Pinmu berhasil dipublish");
    }
  };

  return (
    <main className="space-y-10 pb-20">
      <div className="flex justify-between items-center p-2 border border-zinc-500">
        <h1 className="font-semibold">
          {isEditting ? "Edit Fotomu" : "Buat Pin"}
        </h1>
        <Button onClick={handlePublish}>
          {isEditting ? "Selesai Edit" : "Publish"}
        </Button>
      </div>
      {isEditting ? (
        <Editor previewImage={imagePreview} />
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <Card
            hidden={!!imagePreview.url}
            className="max-w-sm m-auto lg:m-0 w-fit h-fit Card"
          >
            <CardContent>
              <Label htmlFor="img" className="space-y-3 flex flex-col">
                <div className="flex flex-col justify-center items-center gap-4">
                  <IoMdCloudUpload className="h-14 w-14" />
                  <span>Klik disini untuk upload fotomu</span>
                </div>
                <Input
                  ref={imageInputRef}
                  onChange={(e) => {
                    const file = e?.target?.files?.[0] as File;
                    setPinImage(file ?? null);
                  }}
                  defaultValue={imageInputRef.current?.value}
                  hidden
                  type="file"
                  accept="image/*"
                  name=""
                  id="img"
                />
                <span className="text-xs text-blue-500">
                  Kami merekomendasikan menggunakan file .jpg berkualitas tinggi
                  kurang dari 20 MB atau file .mp4 kurang dari 200 MB.
                </span>
              </Label>
            </CardContent>
          </Card>
          <div
            className="max-w-sm p-3 md:p-0 relative m-auto"
            hidden={!imagePreview.url}
          >
            {/* RESET IMAGE BUTTON */}
            <Button
              onClick={() => {
                setImagePreview({
                  url: "",
                  width: 0,
                  height: 0,
                });
                if (imageInputRef.current?.value) {
                  imageInputRef.current.value = "";
                }
              }}
              className={
                "absolute -top-1 -right-1 md:-top-5 md:-right-5 cursor-pointer" +
                buttonVariants({ variant: "destructive" })
              }
            >
              X
            </Button>
            <Label htmlFor="img">
              <img
                src={imagePreview.url || noImageUrl}
                width={imagePreview.width}
                height={imagePreview.height}
                className="rounded-md w-full h-auto object-cover"
              />
            </Label>
            <div className="flex gap-2 w-full">
              <Label
                className={
                  "flex-1/2 my-2 font-semibold tracking-wide" +
                  buttonVariants({ variant: "default" })
                }
                htmlFor="img"
              >
                Change
              </Label>
              <Button
                onClick={() => setIsEditting(true)}
                className="flex-1/2 my-2 font-semibold tracking-wide"
              >
                Edit
              </Button>
            </div>
          </div>
          <Card className="Card flex-1">
            <CardContent>
              <form className="capitalize space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="title">title</Label>
                  <Input type="text" name="title" id="title" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="desc">description</Label>
                  <Textarea rows={6} name="description" id="desc" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="link">link</Label>
                  <Input type="url" name="link" id="link" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="board">Board</Label>
                  <Select>
                    <SelectTrigger id="board">
                      <SelectValue placeholder="Board" id="board" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem disabled value=".">
                        Pilih board
                      </SelectItem>
                      <SelectItem value="board1">board1</SelectItem>
                      <SelectItem value="board2">board2</SelectItem>
                      <SelectItem value="board3">board3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="tags">tags</Label>
                  <Input type="text" name="tags" id="tags" />
                  <span className="text-xs text-green-500">
                    jangan khawatir, orang lain tidak akan melihat tag Anda
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
};

export default CreatePage;
