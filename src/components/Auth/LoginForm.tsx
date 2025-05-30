import { loginValidator } from "@/lib/formValidator";
import { useTheme } from "@/lib/UseThemeContext";
import type { UserAuthForm } from "@/types";
import { Moon, Sun } from "lucide-react";
import { useState, type FormEventHandler } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AuthOption from "./AuthOption";
import { useAuthStore } from "@/utils/zustandStores";

const LoginForm = () => {
  const { setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const form = e.currentTarget;
      const body = Object.fromEntries(
        new FormData(form).entries()
      ) as UserAuthForm["login"];
      loginValidator(body);

      const res = await fetch(
        `${
          import.meta.env.VITE_API_KEY || "http://localhost:3030"
        }/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "include",
        }
      );
      const result = await res.json();
      if (result.error) {
        if (result.isVerified === false) {
          sessionStorage.setItem("identifier", body.identifier || "");
          setIsLoading(false);
          toast(result.message);
          return navigate("/auth?type=verify");
        } else {
          setIsLoading(false);
          throw new Error(result.message);
        }
      }
      setCurrentUser(result.user);
      toast(result.message);
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      toast((err as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <Card className="Card w-sm max-w-sm flex justify-center items-center relative">
      <CardHeader className="flex flex-col gap-3 justify-center items-center w-36 h-36">
        <img
          src="/logo-pin.svg"
          className="w-full h-auto object-cover"
        />
        <CardTitle className="text-nowrap">
          <span>Masuk ke akun Anda</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <span
          onClick={() => setTheme("dark")}
          className="block dark:hidden absolute top-5 right-5 cursor-pointer"
        >
          <Moon />
        </span>
        <span
          onClick={() => setTheme("light")}
          className="hidden dark:block absolute top-5 right-5 cursor-pointer"
        >
          <Sun />
        </span>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="identifier">Email atau Username</Label>
            <Input name="identifier" id="identifier" type="text" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
            />{" "}
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="show-password"
              id="show-password"
              onChange={(e) => setShowPassword(e.currentTarget.checked)}
            />
            <Label className="text-sm text-nowrap" htmlFor="show-password">
              Tampilkan Kata Sandi
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <span>Belum punya akun?</span>
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/auth?type=register")}
            >
              daftar di sini
            </span>
          </div>
          <Button disabled={isLoading} className="w-full">
            Masuk
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <AuthOption />
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
