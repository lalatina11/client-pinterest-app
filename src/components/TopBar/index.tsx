import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import UserMenu from "../UserMenu";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const TopBar = () => {
  const nav = useNavigate();
  return (
    <div className="my-4 flex items-center gap-4">
      {/* SEARCH */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const inputVal = new FormData(e.currentTarget).get("inputVal");
          if (!inputVal || inputVal?.toString().trim().length < 1) return;
          nav(`search?q=${inputVal}`);
          toast("search for " + inputVal);
          e.currentTarget.reset();
        }}
        className="relative flex-1"
      >
        <button className="absolute top-3 left-4">
          <FaSearch />
        </button>
        <Input
          type="text"
          className="px-12"
          placeholder="Search.."
          name="inputVal"
          id="inputVal"
        />
      </form>
      {/* USER */}
      <UserMenu />
    </div>
  );
};

export default TopBar;
