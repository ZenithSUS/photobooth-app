import Header from "../components/ui/header";
import Sidebar from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/ui/loading";
import fetchAuthUser from "../lib/services/getAuth";

export default function UserLayout() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      let userSession = JSON.parse(localStorage.getItem("session") || "false");

      if (userSession) {
        const authResult = await fetchAuthUser(userSession);
        setIsAuthenticated(!!authResult);
      } else {
        setIsAuthenticated(false);
      }

      setAuthChecked(true);
    };

    checkAuth();
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

  if (authChecked && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!authChecked) {
    return <Loading />;
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
