import { FaRegPlusSquare } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { NavLink } from "react-router";
import { ModeToggle } from "../ModeToggle";

const navItem = [
  {
    name: "logo",
    href: "/",
    element: (
      <img className="w-5 md:w-6 h-5 md:h-6 object-cover" src="/logo-pin.svg" alt="Logo" />
    ),
  },
  {
    name: "create",
    href: "/create",
    element: <FaRegPlusSquare className="w-5 md:w-6 h-5 md:h-6 object-cover" />,
  },
  {
    name: "update",
    href: "/update",
    element: <IoNotificationsSharp className="w-5 md:w-6 h-5 md:h-6 object-cover" />,
  },
  {
    name: "message",
    href: "/message",
    element: <MdOutlineMessage className="w-5 md:w-6 h-5 md:h-6 object-cover" />,
  },
];

const LeftBar = () => {
  return (
    <div className="flex flex-col justify-between h-screen items-center sticky top-0 w-[50px] md:w-[72px] overflow-x-hidden py-4 border-r border-zinc-500">
      <div className="flex flex-col gap-6 items-center">
        {navItem.map((data) => (
          <NavLink
            key={data.name}
            className={({ isActive }) =>
              isActive
                ? "w-8 md:w-12 h-8 md:h-12 flex justify-center items-center hover:scale-110 transition-all ease-in-out duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-md bg-zinc-300 dark:bg-zinc-700"
                : "w-8 md:w-12 h-8 md:h-12 flex justify-center items-center hover:scale-110 transition-all ease-in-out duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-md"
            }
            to={data.href}
          >
            {data.element}
          </NavLink>
        ))}
        <div className="w-8 md:w-12 h-8 md:h-12 flex justify-center items-center hover:scale-110 transition-all ease-in-out duration-300 rounded-md">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
