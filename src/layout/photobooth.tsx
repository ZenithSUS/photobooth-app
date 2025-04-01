import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { account } from "../appwrite";
import { Navigate } from "react-router-dom";

export default function MainLayout() {
  const user = localStorage.getItem("session");

  async function getAuthUser() {
    try {
      const authUser = await account.get();
      console.log(authUser);
      return authUser.$id || null;
    } catch (error) {
      console.log("Could not get auth user", error);
      return null;
    }
  }

  useEffect(() => {
    if (!getAuthUser()) {
      localStorage.clear();
    }
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="flex flex-col h-screen w-screen gap-5 items-center">
      <Outlet />
    </main>
  );
}
