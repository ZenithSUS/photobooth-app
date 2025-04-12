import Header from "../components/ui/header";
import Sidebar from "../components/ui/sidebar";
import Burger from "../assets/ui/burger.png";
import { Outlet } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import { account } from "../appwrite";
import { Navigate } from "react-router-dom";

export default function UserLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  let user = JSON.parse(localStorage.getItem("session") || "false") as boolean;

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const session = await account.getSession("current");
        if (session.current) {
          localStorage.setItem("session", JSON.stringify(session.current));
          user = session.current;
          const data = await account.get();
          localStorage.setItem("id", JSON.stringify(data.$id));
          localStorage.setItem("name", JSON.stringify(data.name));
          localStorage.setItem("email", JSON.stringify(data.email));
          localStorage.setItem("joined", JSON.stringify(data.$createdAt));
        }
      } catch (error) {
        localStorage.clear();
        account.deleteSession("current");
        return;
      }
    };

    fetchAuthUser();
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

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
