import Header from "../components/ui/header";
import Sidebar from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
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
