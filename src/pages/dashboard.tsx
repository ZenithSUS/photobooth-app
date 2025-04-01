import { useEffect } from "react";

export default function Dashboard() {
  const user = localStorage.getItem("session");

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, [user]);

  return (
    <main className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="flex flex-col gap-1.5 md:grid md:grid-cols-2 md:gap-4 w-full">
        <div className="flex flex-col bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Saved Photos</h2>
            <img
              src="https://img.icons8.com/ios/50/null/filled-folder.png"
              alt="folder"
            />
          </div>
          <h2 className="text-2xl font-bold">0</h2>
        </div>

        <div className="flex flex-col bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-400 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Saved Videos</h2>
            <img
              src="https://img.icons8.com/ios/50/null/filled-folder.png"
              alt="folder"
            />
          </div>
          <h2 className="text-2xl font-bold">0</h2>
        </div>

        <div className="flex flex-col bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Friends</h2>
            <img
              src="https://img.icons8.com/ios/50/null/filled-folder.png"
              alt="folder"
            />
          </div>
          <h2 className="text-2xl font-bold">0</h2>
        </div>

        <div className="flex flex-col bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Shared Photos</h2>
            <img
              src="https://img.icons8.com/ios/50/null/filled-folder.png"
              alt="folder"
            />
          </div>

          <h2 className="text-2xl font-bold">0</h2>
        </div>
      </div>
    </main>
  );
}
