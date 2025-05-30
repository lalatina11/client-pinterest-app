import { apiRequest } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import ToasterProvider from "./components/ToasterProvider.tsx";
import AuthLayout from "./Layout/AuthLayout.tsx";
import Layout from "./Layout/index.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import CreatePage from "./pages/CreatePage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import PostPage from "./pages/PostPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import { useAuthStore } from "./utils/zustandStores.ts";

const App = () => {
  const { setCurrentUser } = useAuthStore();
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await apiRequest("/api/users/current-user");
        setCurrentUser(res.data.user);
        return res.data.user;
      } catch (error) {
        return (error as Error).message;
      }
    },
  });
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/pin/:id" element={<PostPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/auth" element={<AuthPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToasterProvider />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
