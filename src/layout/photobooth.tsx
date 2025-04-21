import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import { Navigate } from "react-router-dom";
import fetchAuthUser from "../lib/services/getAuth";

export default function MainLayout() {
  let user = JSON.parse(localStorage.getItem("session") || "false") as boolean;
  const guestMode = !user;

  useEffect(() => {
    if (guestMode) return;
    const getAuth = async () => {
      user = await fetchAuthUser(user as boolean);
    };
    getAuth();
  }, []);

  if (!user && !guestMode) {
    return <Navigate to="/login" />;
  }
  <Outlet />;
  return (
    <main className="grid min-h-dvh grid-rows-[auto_1fr]">
      <Outlet />
    </main>
  );
}
