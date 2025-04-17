import { Link } from "react-router-dom";
import { account } from "../../appwrite";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useTransition } from "react";
import Modal from "react-modal";
import accountIcon from "../../assets/ui/account.png";
import cameraIcon from "../../assets/ui/camera.png";
import logoutIcon from "../../assets/ui/logout.png";
import socialIcon from "../../assets/ui/social.png";
import saveIcon from "../../assets/ui/save.png";
import dashboardIcon from "../../assets/ui/dashboard.png";

Modal.setAppElement("#root");

type NavItem = {
  to: string;
  icon: string;
  label: string;
  alt: string;
};

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
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      to: "/dashboard",
      icon: dashboardIcon,
      label: "Dashboard",
      alt: "dashboard",
    },
    { to: "/social", icon: socialIcon, label: "Social", alt: "social" },
    { to: "/photos", icon: saveIcon, label: "Save Photos", alt: "photos" },
    {
      to: "/photo-booth",
      icon: cameraIcon,
      label: "Photo Booth",
      alt: "camera",
    },
    { to: "/account", icon: accountIcon, label: "Account", alt: "account" },
  ];

  const handleLogout = () => {
    setIsModalOpen(true);
    if (isMobile) closeMobileMenu();
  };

  const logout = async () => {
    try {
      startTransition(async () => {
        await account.deleteSession("current");
        localStorage.clear();
        navigate("/login");
      });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
      console.error("Logout error:", error);
    }
  };

  const closeLogoutModal = () => {
    setIsModalOpen(false);
  };

  const NavItem = ({ item }: { item: NavItem }) => (
    <Link
      to={item.to}
      onClick={isMobile ? closeMobileMenu : undefined}
      className="flex items-center gap-2 rounded p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-amber-400"
    >
      <img src={item.icon} alt={item.alt} className="h-8 w-8" />
      {item.label}
    </Link>
  );

  return (
    <nav
      className={`fixed lg:relative ${
        isMobile && !isMobileMenuOpen ? "hidden" : "lg:block"
      } top-0 left-0 z-20 flex-col pl-4 ${
        isMobile ? "w-full pt-35 md:pt-30" : "w-[300px]"
      } h-screen overflow-auto bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 lg:border-r-2 lg:border-amber-400`}
    >
      <Modal
        parentSelector={() => document.querySelector("#root") as HTMLElement}
        isOpen={isModalOpen}
        onRequestClose={closeLogoutModal}
        className={
          "bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
        }
        overlayClassName={
          "fixed inset-0 z-40 bg-black/50 bg-opacity-50 backdrop-blur-sm"
        }
      >
        <div className="z-20 flex flex-col items-center gap-4 rounded-xl bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-5">
          <h1>Are you sure you want to logout?</h1>
          <div className="flex gap-4">
            <button
              className="cursor-pointer rounded-xl bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-400 p-2 hover:scale-105 hover:bg-gradient-to-br hover:from-fuchsia-400 hover:via-purple-400 hover:to-violet-400 disabled:bg-gradient-to-br disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400"
              onClick={logout}
              disabled={isPending}
              type="button"
            >
              Confirm
            </button>
            <button
              onClick={closeLogoutModal}
              type="button"
              disabled={isPending}
              className="cursor-pointer rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-2 hover:scale-105 hover:bg-gradient-to-br hover:from-red-400 hover:via-rose-400 hover:to-pink-400 disabled:bg-gradient-to-br disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <div className="flex items-center justify-between lg:pr-4 lg:pb-4">
        <h1 className="mt-1.5 hidden text-center text-3xl font-bold lg:block lg:text-start">
          Navigation
        </h1>
      </div>

      <div
        className={`flex flex-col ${
          isMobile ? "items-center py-4" : "ml-4 items-start"
        } gap-6 text-2xl`}
      >
        {navItems.map((item) => (
          <NavItem key={item.to} item={item} />
        ))}

        <button
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-2 rounded p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-amber-400"
        >
          <img src={logoutIcon} alt="logout" className="h-8 w-8" />
          Logout
        </button>
      </div>
    </nav>
  );
}
