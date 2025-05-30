import { noImageUrl } from "@/lib/dummyData";
import { Image } from "@imagekit/react";

interface Props {
  imageUrl: string;
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

const ImageRenderer = (props: Props) => {
  const { imageUrl, className, width, height } = props;
  return (
    <Image
      src={imageUrl ?? noImageUrl}
      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_API || "your end point"}
      className={
        className ??
        "w-full h-auto object-cover shadow shadow-zinc-500 rounded hover:rounded-xl"
      }
      loading="lazy"
      transformation={[{ width: width ?? 372, height: height ?? undefined }]}
      alt="Failed to get the image"
      lqip={{ active: true, quality: 20 }}
    />
  );
};

export default ImageRenderer;
