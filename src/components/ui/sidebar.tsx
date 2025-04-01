import { Link } from "react-router-dom";
import { account } from "../../appwrite";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const logout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      toast.success("Logged out successfully!");
      await account.deleteSession("current");
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <div className="absolute hidden md:block top-0 left-0 bottom-0 flex-col pt-20 pl-4 w-[300px] h-screen bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 border-r-2 border-amber-400 overflow-y-auto">
      <h1 className="text-3xl font-bold pb-4">Navigation</h1>
      <div className="flex flex-col gap-6 text-2xl ml-4 items-start">
        <Link
          to="/"
          className="rounded hover:bg-amber-400 hover:scale-105 p-2 transition-all duration-300 ease-in-out"
        >
          Dashboard
        </Link>
        <Link
          to="/social"
          className="rounded hover:bg-amber-400 hover:scale-105 p-2 transition-all duration-300 ease-in-out"
        >
          Social
        </Link>
        <Link
          to="/photos"
          className="rounded hover:bg-amber-400 hover:scale-105 p-2 transition-all duration-300 ease-in-out"
        >
          Save Photos
        </Link>
        <Link
          to="/photo-booth"
          className="rounded hover:bg-amber-400 hover:scale-105 p-2 transition-all duration-300 ease-in-out"
        >
          Photo Booth
        </Link>
        <Link
          to="/account"
          className="rounded hover:bg-amber-400 hover:scale-105 p-2 transition-all duration-300 ease-in-out"
        >
          Account
        </Link>
        <button
          onClick={logout}
          className="rounded hover:bg-amber-400 hover:scale-105 p-2 transition-all duration-300 ease-in-out cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
