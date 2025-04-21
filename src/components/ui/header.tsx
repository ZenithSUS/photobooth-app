import Burger from "../../assets/ui/burger.png";
import unknown from "../../assets/ui/unknown.jpg";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
};

export default function Header({
  isMobile,
  isMobileMenuOpen,
  toggleMobileMenu,
}: HeaderProps) {
  const navigate = useNavigate();
  const name = JSON.parse(localStorage.getItem("name") as string);
  const profileImage = JSON.parse(
    localStorage.getItem("profileImage") || ("" as string),
  );

  return (
    <header className="bg-primary-light sticky top-0 right-0 left-0 z-30 flex flex-col items-center gap-1.5 p-4 text-black shadow-sm shadow-black/40 lg:flex-row lg:justify-between lg:gap-0">
      {isMobile && (
        <div className="absolute top-4 right-4 z-30">
          <button
            className="mb-4 text-2xl lg:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              "X"
            ) : (
              <img src={Burger} alt="burger" className="h-8 w-8" />
            )}
          </button>
        </div>
      )}
      <h1 className="photobooth-text-italic text-3xl font-bold">ZenithBooth</h1>
      <div
        className="flex cursor-pointer items-center justify-center gap-2"
        onClick={() => navigate("account")}
      >
        <p className="text-center text-2xl font-bold">Hello, {name}</p>
        <img
          src={
            profileImage !== null && profileImage != "N/A"
              ? profileImage
              : unknown
          }
          alt="profile_img"
          className="h-12 w-12 rounded-full hover:scale-105"
        />
      </div>
    </header>
  );
}
