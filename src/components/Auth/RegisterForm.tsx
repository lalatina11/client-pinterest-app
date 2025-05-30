import { registerValidator } from "@/lib/formValidator";
import { useTheme } from "@/lib/UseThemeContext";
import type { UserAuthForm } from "@/types";
import { Moon, Sun } from "lucide-react";
import { useState, type FormEventHandler } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { apiRequest } from "@/lib";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";

const RegisterForm = () => {
  const { setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const body = Object.fromEntries(
        new FormData(e.currentTarget).entries()
      ) as UserAuthForm["register"];
      registerValidator(body);
      const { data } = await apiRequest.post("/api/users/register", body);
      if (data.error) {
        throw new Error(data.message);
      }
      toast(
        "Pendaftaran berhasil, Kami telah mengirimkan kode otp, silahkan verifikasi"
      );
      sessionStorage.setItem("identifier", body.username || "");
      navigate("/auth?type=verify");
      setIsLoading(false);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data?.message) {
        toast(error.response.data.message);
      } else {
        toast("Something went wrong");
      }

      setIsLoading(false);
    }
  };

  return (
    <Card className="Card w-sm max-w-sm flex justify-center items-center relative mb-10 mt-5">
      <CardHeader className="flex flex-col gap-3 justify-center items-center w-36 h-36">
        <img src="/logo-pin.svg" className="w-full h-auto object-cover" />
        <CardTitle className="text-nowrap">
          <span>Daftarkan akun Anda</span>
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
        <form onSubmit={handleSubmit} className="space-y-6" action="">
          <div className="space-y-3">
            <Label htmlFor="username">Username</Label>
            <Input name="username" id="username" type="text" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="name">Nama</Label>
            <Input name="name" id="name" type="text" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" type="email" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
            />
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
            <span>Sudah punya akun?</span>
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/auth?type=login")}
            >
              login di sini
            </span>
          </div>
          <Button disabled={isLoading} className="w-full">
            Daftar sekarang
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
