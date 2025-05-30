import Layers from "./Layers";
import Options from "./Options";
import WorkSpace from "./WorkSpace";

export interface ImageEditorProps {
  previewImage: {
    url: string;
    width: number;
    height: number;
  };
}

const Editor = (props: ImageEditorProps) => {
  return (
    <div className="flex gap-4">
      <Layers previewImage={props.previewImage} />
      <WorkSpace previewImage={props.previewImage} />
      <Options previewImage={props.previewImage} />
    </div>
  );
};

export default Editor;
