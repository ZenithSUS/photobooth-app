import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { account } from "../appwrite";
import { Navigate } from "react-router-dom";

export default function MainLayout() {
  const user = localStorage.getItem("session");

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
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="grid min-h-dvh grid-rows-[auto_1fr]">
      <Outlet />
    </main>
  );
}
