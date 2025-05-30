import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";

const AuthOption = () => {
  const handleAuthBtn = (type: "github" | "google") => {
    window.location.href = `${
      import.meta.env.VITE_API_KEY || "http://localhost:3030"
    }/api/users/${type === "github" ? "github" : "google"}`;
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center gap-4">
        <hr className="h-[1px] w-[50px] bg-zinc-500 rounded-md" />
        <span className="text-xs text-nowrap">Atau Login Menggunakan</span>
        <hr className="h-[1px] w-[50px] bg-zinc-500 rounded-md" />
      </div>
      <div className="flex justify-around items-center gap-4">
        <Button className="flex-1/2" onClick={() => handleAuthBtn("google")}>
          <FcGoogle />
        </Button>
        <Button className="flex-1/2" onClick={() => handleAuthBtn("github")}>
          <FaGithub />
        </Button>
      </div>
    </div>
  );
};

export default AuthOption;
