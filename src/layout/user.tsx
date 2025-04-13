import Header from "../components/ui/header";
import Sidebar from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import fetchAuthUser from "../lib/services/getAuth";

export default function UserLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  let user = JSON.parse(localStorage.getItem("session") || "false") as boolean;
  const guestMode = !user;

  useEffect(() => {
    if (guestMode) return;
    const getAuth = async () => {
      user = await fetchAuthUser(user);
    };
    getAuth();
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
    <div className="flex h-screen flex-col overflow-hidden">
      <Header
        isMobile={isMobile}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isMobileMenuOpen={isMobileMenuOpen}
          closeMobileMenu={closeMobileMenu}
          isMobile={isMobile}
        />

        <main
          className={`flex-1 overflow-auto p-4 ${
            isMobile ? "w-full" : "ml-[300px] lg:ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
