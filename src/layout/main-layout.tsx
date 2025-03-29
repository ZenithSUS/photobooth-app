import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="flex flex-col p-4 w-full">
      <h1 className="text-3xl text-center font-bold">Photo Booth</h1>
      <Outlet />
    </main>
  );
}
