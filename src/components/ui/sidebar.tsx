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
      className="hover:bg-secondary flex items-center gap-7 rounded p-2 transition-all duration-300 ease-in-out hover:scale-105"
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
      } bg-primary h-screen overflow-auto lg:border-black/45`}
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
        <div className="bg-primary z-20 flex flex-col items-center gap-4 rounded-xl p-5">
          <h1 className="text-2xl font-semibold">
            Are you sure you want to logout?
          </h1>
          <div className="flex gap-4">
            <button
              onClick={closeLogoutModal}
              type="button"
              disabled={isPending}
              className="bg-button-info-bg hover:bg-button-info-hover-bg text-button-accent-text hover:text-button-accent-hover-text cursor-pointer rounded-xl p-2 transition duration-300 ease-in-out hover:scale-105 disabled:bg-gray-400"
            >
              Cancel
            </button>
            <button
              className="bg-button-success-bg hover:bg-button-success-hover-bg text-button-accent-text hover:text-button-accent-hover-text cursor-pointer rounded-xl p-2 transition duration-300 ease-in-out hover:scale-105 disabled:bg-gray-400"
              onClick={logout}
              disabled={isPending}
              type="button"
            >
              Confirm
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
          className="hover:bg-secondary flex cursor-pointer items-center gap-7 rounded p-2 transition-all duration-300 ease-in-out hover:scale-105"
        >
          <img src={logoutIcon} alt="logout" className="h-8 w-8" />
          Logout
        </button>
      </div>
    </nav>
  );
}
