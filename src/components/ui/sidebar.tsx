import { Link } from "react-router-dom";
import { account } from "../../appwrite";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import accountIcon from "../../assets/ui/account.png";
import cameraIcon from "../../assets/ui/camera.png";
import logoutIcon from "../../assets/ui/logout.png";
import socialIcon from "../../assets/ui/social.png";
import saveIcon from "../../assets/ui/save.png";
import dashboardIcon from "../../assets/ui/dashboard.png";
import Modal from "react-modal";

Modal.setAppElement("#root");

type SidebarProps = {
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  closeMobileMenu: () => void;
};

export default function Sidebar({
  isMobileMenuOpen,
  closeMobileMenu,
  isMobile,
}: SidebarProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      toast.success("Logged out successfully!");
      await account.deleteSession("current");
      localStorage.clear();
      navigate("/login");
    }
  };

  const closeLogoutModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`absolute ${isMobileMenuOpen ? "block" : "hidden"} top-0 bottom-0 left-0 z-20 flex-col pl-4 md:block ${isMobile ? "w-full pt-36" : "w-[300px] pt-20"} min-h-screen overflow-y-auto border-r-2 border-amber-400 bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400`}
    >
      <Modal
        parentSelector={() => document.querySelector("#root") as HTMLElement}
        isOpen={isModalOpen}
        onRequestClose={closeLogoutModal}
        className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-white"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"
      ></Modal>
      <div className="flex items-center justify-between pr-4 pb-4">
        <h1 className="text-3xl font-bold">Navigation</h1>
        {isMobile && (
          <button onClick={closeMobileMenu} className="text-2xl text-white">
            X
          </button>
        )}
      </div>
      <div className="ml-4 flex flex-col items-start gap-6 text-2xl">
        <Link
          to="/"
          onClick={isMobile ? closeMobileMenu : undefined}
          className="flex items-center gap-2 rounded p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-amber-400"
        >
          <img src={dashboardIcon} alt="photos" className="h-8 w-8" />
          Dashboard
        </Link>
        <Link
          to="/social"
          onClick={isMobile ? closeMobileMenu : undefined}
          className="flex items-center gap-2 rounded p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-amber-400"
        >
          <img src={socialIcon} alt="social" className="h-8 w-8" />
          Social
        </Link>
        <Link
          to="/photos"
          onClick={isMobile ? closeMobileMenu : undefined}
          className="flex items-center gap-2 rounded p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-amber-400"
        >
          <img src={saveIcon} alt="photos" className="h-8 w-8" />
          Save Photos
        </Link>
        <Link
          to="/photo-booth"
          onClick={isMobile ? closeMobileMenu : undefined}
          className="flex items-center gap-2 rounded p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-amber-400"
        >
          <img src={cameraIcon} alt="camera" className="h-8 w-8" />
          Photo Booth
        </Link>
        <Link
          to="/account"
          onClick={isMobile ? closeMobileMenu : undefined}
          className="flex items-center gap-2 rounded p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-amber-400"
        >
          <img src={accountIcon} alt="account" className="h-8 w-8" />
          Account
        </Link>
        <button
          onClick={logout}
          className="flex cursor-pointer items-center gap-2 rounded p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-amber-400"
        >
          <img src={logoutIcon} alt="logout" className="h-8 w-8" />
          Logout
        </button>
      </div>
    </div>
  );
}
