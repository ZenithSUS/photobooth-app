import { Link } from "react-router-dom";
import { account } from "../../appwrite";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import accountIcon from "../../assets/ui/account.png";
import cameraIcon from "../../assets/ui/camera.png";
import logoutIcon from "../../assets/ui/logout.png";
import socialIcon from "../../assets/ui/social.png";
import saveIcon from "../../assets/ui/save.png";
import dashboardIcon from "../../assets/ui/dashboard.png";


type SidebarProps = {
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  closeMobileMenu: () => void;
};

export default function Sidebar({ isMobileMenuOpen, closeMobileMenu, isMobile }: SidebarProps) {
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
    <div className={`absolute ${isMobileMenuOpen ? "block" : "hidden"} z-20 md:block top-0 left-0 bottom-0 flex-col pl-4 ${isMobile ? "w-full pt-36" : " w-[300px] pt-20"} min-h-screen bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 border-r-2 border-amber-400 overflow-y-auto`}>
      <div className="flex items-center justify-between pr-4">
        <h1 className="text-3xl font-bold pb-4">Navigation</h1>
        {isMobile && (
          <button
            onClick={closeMobileMenu}
            className="text-2xl text-white"
          >
            X
          </button>
        )}
      </div>
      <div className="flex flex-col gap-6 text-2xl ml-4 items-start">
        <Link
          to="/"
          className="flex gap-2 items-center rounded hover:bg-amber-400 hover:scale-105 p-2 transition-all duration-300 ease-in-out"
        >
          <img src={dashboardIcon} alt="photos" className="w-8 h-8" />
          Dashboard
        </Link>
        <Link
          to="/social"
          className="flex gap-2 items-center rounded hover:bg-amber-400 hover:scale-105 p-2 transition-all duration-300 ease-in-out"
        >
          <img src={socialIcon} alt="social" className="w-8 h-8" />
          Social
        </Link>
        <Link
          to="/photos"
          className="flex gap-2 items-center rounded hover:bg-amber-400 hover:scale-105 p-2 transition-all duration-300 ease-in-out"
        >
          <img src={saveIcon} alt="photos" className="w-8 h-8" />
          Save Photos
        </Link>
        <Link
          to="/photo-booth"
          className="flex gap-2 items-center rounded hover:bg-amber-400 hover:scale-105 p-2 transition-all duration-300 ease-in-out"
        >
          <img src={cameraIcon} alt="camera" className="w-8 h-8" />
          Photo Booth
        </Link>
        <Link
          to="/account"
          className="flex gap-2 items-center rounded hover:bg-amber-400 hover:scale-105 p-2 transition-all duration-300 ease-in-out"
        >
          <img src={accountIcon} alt="account" className="w-8 h-8" />
          Account
        </Link>
        <button
          onClick={logout}
          className="flex gap-2 items-center rounded hover:bg-amber-400 hover:scale-105 p-2 transition-all duration-300 ease-in-out cursor-pointer"
        >
          <img src={logoutIcon} alt="logout" className="w-8 h-8" />
          Logout
        </button>
      </div>
    </div>
  );
}
