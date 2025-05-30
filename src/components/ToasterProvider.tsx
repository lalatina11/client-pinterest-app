import { useTheme } from "@/lib/UseThemeContext";
import { Toaster } from "sonner";

const ToasterProvider = () => {
  const { theme } = useTheme();
  return <Toaster invert={theme === "light"} />;
};

export default ToasterProvider;
