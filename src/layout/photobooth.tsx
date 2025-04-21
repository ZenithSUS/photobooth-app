import { Outlet } from "react-router-dom";
import { account } from "../appwrite";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import fetchAuthUser from "../lib/services/getAuth";
import Loading from "../components/ui/loading";

export default function MainLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    if (guestMode) return;
    const getAuth = async () => {
      user = await fetchAuthUser(user);
    };
    getAuth();
  }, []);

  if (isAuthChecking) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  <Outlet />;
  return (
    <main className="grid min-h-dvh grid-rows-[auto_1fr]">
      <Outlet />
    </main>
  );
}
