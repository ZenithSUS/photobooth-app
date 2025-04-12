import Header from "../components/ui/header";
import Sidebar from "../components/ui/sidebar";
import Burger from "../assets/ui/burger.png";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { account } from "../appwrite";
import { Navigate } from "react-router-dom";

export default function UserLayout() {
  const user = localStorage.getItem("session");
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
      setMobileMenuOpen(false);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const data = await account.get();
        localStorage.setItem("id", JSON.stringify(data.$id));
        localStorage.setItem("name", JSON.stringify(data.name));
        localStorage.setItem("email", JSON.stringify(data.email));
        localStorage.setItem("joined", JSON.stringify(data.$createdAt));
      } catch (error) {
        localStorage.clear();
        account.deleteSession("current");
        return;
      }
    };

    fetchAuthUser();
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        closeMobileMenu={closeMobileMenu}
        isMobile={isMobile}
      />
      <div className="flex w-full flex-col">
        <Header />
        <div className={`flex flex-col p-4 lg:ml-[calc(300px+2rem)]`}>
          {isMobile && (
            <div className="ml-auto">
              <button
                className="mb-4 text-2xl lg:hidden"
                onClick={toggleMobileMenu}
              >
                <img src={Burger} alt="burger" className="h-8 w-8" />
              </button>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
