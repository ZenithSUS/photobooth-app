import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { account } from "../appwrite";
import { Navigate } from "react-router-dom";

export default function MainLayout() {
  const user = localStorage.getItem("session");

  useEffect(() => {
    const fetchAuthUser = async () => {
      const data = await account.get();
      if (!data) {
        localStorage.clear();
        return;
      }
      localStorage.setItem("user-department", JSON.stringify(data.labels[1]));
      localStorage.setItem("name", JSON.stringify(data.name));
    };

    fetchAuthUser();
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="flex flex-col h-screen w-screen gap-5 items-center">
      <Outlet />
    </main>
  );
}
