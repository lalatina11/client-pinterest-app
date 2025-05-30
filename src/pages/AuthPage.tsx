import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import VerifyForm from "@/components/Auth/VerifyForm";
import { useAuthStore } from "@/utils/zustandStores";
import { Navigate, useSearchParams } from "react-router";
type AuthPage = "login" | "register" | "verify" | string | null | undefined;
const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as AuthPage;
  const { currentUser } = useAuthStore();

  if (currentUser) return <Navigate to={"/"} />;

  return (
    <main className="min-h-screen overflow-y-auto flex justify-center items-center">
      {type === "login" ? (
        <LoginForm />
      ) : type === "register" ? (
        <RegisterForm />
      ) : type === "verify" ? (
        <VerifyForm />
      ) : (
        <Navigate to={"/auth?type=login"} />
      )}
    </main>
  );
};

export default AuthPage;
