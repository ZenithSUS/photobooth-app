import { useEffect } from "react";
import photoIcon from "../assets/ui/save.png";
import friendsIcon from "../assets/ui/friends.png";
import videoIcon from "../assets/ui/video.png";
import sharedPhotoIcon from "../assets/ui/share-photo.png";
import { getSharedPhotos } from "../hooks/shared.ts";
import Loading from "../components/ui/loading.tsx";

export default function Dashboard() {
  const user = localStorage.getItem("session");
  const id = JSON.parse(localStorage.getItem("id") as string);
  const { data: shared, isLoading } = getSharedPhotos(id);

  if (shared) {
    console.log(shared);
  }

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="flex w-full flex-col gap-1.5 md:grid md:grid-cols-2 md:gap-4">
        <div className="flex flex-col bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Saved Photos</h2>
            <img src={photoIcon} alt="saveImages" className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold">0</h2>
        </div>

        <div className="flex flex-col bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-400 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Saved Videos</h2>
            <img src={videoIcon} alt="saveVideos" className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold">0</h2>
        </div>

        <div className="flex flex-col bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Friends</h2>
            <img src={friendsIcon} alt="friends" className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold">0</h2>
        </div>

        <div className="flex flex-col bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Shared Photos</h2>
            <img
              src={sharedPhotoIcon}
              alt="sharedPhotos"
              className="h-10 w-10"
            />
          </div>

          <h2 className="text-2xl font-bold">{shared?.length}</h2>
        </div>
      </div>
    </div>
  );
}
