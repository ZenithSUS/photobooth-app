import Header from "../components/ui/header";
import Sidebar from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { account } from "../appwrite";
import { Navigate } from "react-router-dom";

export default function UserLayout() {
  const user = localStorage.getItem("session");

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
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-col md:ml-[calc(300px+2rem)] p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
