import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface Props {
  className?: string;
}

const BackButton = (props: Props) => {
  const navigate = useNavigate();
  const { className } = props;
  return (
    <Button className={className ?? ""} onClick={() => navigate(-1)}>
      <ArrowLeft />
    </Button>
  );
};

export default BackButton;
