import { verifyOtpValidator } from "@/lib/formValidator";
import { useTheme } from "@/lib/UseThemeContext";
import type { UserAuthForm } from "@/types";
import { Moon, Sun } from "lucide-react";
import { type FormEventHandler } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Label } from "../ui/label";

const VerifyForm = () => {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const identifier = sessionStorage.getItem("identifier");

  if (!identifier) {
    <Navigate to={"/auth?type=login"} />;
  }
  const handleSubmitForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const body = Object.fromEntries(
        new FormData(e.currentTarget).entries()
      ) as UserAuthForm["verify"];

      verifyOtpValidator(body);

      const res = await fetch(
        `${
          import.meta.env.VITE_API_KEY || "http://localhost:3030"
        }/api/users/verify`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        throw new Error("Terjadi kesalahan Silahkan coba lagi beberapa saat");
      }
      const result = await res.json();
      if (result.error) {
        throw new Error(result.message);
      }
      sessionStorage.removeItem("identifier");
      toast(result.message);
      navigate("/auth?type=login");
    } catch (error) {
      toast((error as Error).message);
    }
  };

  return (
    <Card className="Card relative">
      <span className="flex text-xl font-semibold w-fit m-auto">
        Verify Your Registry
      </span>
      <CardContent>
        <span
          onClick={() => setTheme("dark")}
          className="block dark:hidden absolute top-3 right-3 cursor-pointer"
        >
          <Moon />
        </span>
        <span
          onClick={() => setTheme("light")}
          className="hidden dark:block absolute top-3 right-3 cursor-pointer"
        >
          <Sun />
        </span>
        <form onSubmit={handleSubmitForm} className="max-w-sm space-y-3">
          <Input
            type="hidden"
            name="identifier"
            defaultValue={identifier || ""}
          />
          <div className="flex justify-center items-center flex-col gap-3">
            <Label>Your OTP Code</Label>
            <InputOTP name="otp" maxLength={6}>
              <InputOTPGroup className="space-x-2">
                <InputOTPSlot className="ring ring-zinc-500" index={0} />
                <InputOTPSlot className="ring ring-zinc-500" index={1} />
                <InputOTPSlot className="ring ring-zinc-500" index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup className="space-x-2">
                <InputOTPSlot className="ring ring-zinc-500" index={3} />
                <InputOTPSlot className="ring ring-zinc-500" index={4} />
                <InputOTPSlot className="ring ring-zinc-500" index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button className="w-full">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyForm;
