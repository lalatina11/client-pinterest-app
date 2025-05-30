import LeftBar from "@/components/LeftBar";
import TopBar from "@/components/TopBar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex gap-4 w-full">
      <LeftBar />
      <div className="flex-1 mr-4">
        <TopBar />
        <Outlet/>
      </div>
    </div>
  );
};

export default Layout;
