import Header from "../components/ui/header";
import Sidebar from "../components/ui/sidebar";
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
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    const fetchAuthUser = async () => {
      const data = await account.get();
      if (!data) {
        localStorage.clear();
        account.deleteSession("current");
        return;
      }

      localStorage.setItem("id", JSON.stringify(data.$id));
      localStorage.setItem("name", JSON.stringify(data.name));
      localStorage.setItem("email", JSON.stringify(data.email));
      localStorage.setItem("joined", JSON.stringify(data.$createdAt));
    };

    fetchAuthUser();
    handleResize();
    window.addEventListener("resize", handleResize);
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
        <div className="flex flex-col p-4 md:ml-[calc(300px+2rem)]">
          {isMobile && (
            <div className="ml-auto">
              <button
                className="mb-4 text-2xl md:hidden"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? "Close Menu" : "Open Menu"}
              </button>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
