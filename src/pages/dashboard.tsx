import photoIcon from "../assets/ui/save.png";
import downloadIcon from "../assets/ui/downloading.png";
import heartIcon from "../assets/ui/heart.png";
import sharedPhotoIcon from "../assets/ui/share-photo.png";
import { getAllPhotosByUser } from "../hooks/photos.ts";
import { useNavigate } from "react-router-dom";
import Loading from "../components/ui/loading.tsx";
import formatDate from "../utils/functions/format-date.ts";
import userFilter from "../utils/functions/userFilter.ts";
import Axlot from "../components/stickers/axlot/cam.tsx";
import Minecraft from "../components/stickers/minecraft/cam.tsx";
import Cat from "../components/stickers/cat/cam.tsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("id") as string);
  const { data: photos, isLoading } = getAllPhotosByUser(id);

  if (isLoading) return <Loading />;

  const handleView = (id: string) => {
    navigate(`/photo-booth/${id}`);
  };

  const latestPhoto = photos
    ?.slice(0, 4)
    .sort((a, b) => Number(b.$createdAt) - Number(a.$createdAt));

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
            <h2 className="text-2xl font-bold">Total Hearts</h2>
            <img src={heartIcon} alt="heart" className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold">{0}</h2>
        </div>

        <div className="flex flex-col bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Downloads</h2>
            <img
              src={downloadIcon}
              alt="downloadImages"
              className="h-10 w-10"
            />
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

          <h2 className="text-2xl font-bold">{photos?.length}</h2>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Latest Photos</h1>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          {latestPhoto?.map((photo) => (
            <div
              key={photo.$id}
              className="flex flex-col items-center gap-2.5 rounded border border-gray-200 bg-white p-4 shadow-md"
            >
              <div className="relative w-full p-0.5">
                {photo.sticker === "Axlot" && <Axlot />}
                {photo.sticker === "Minecraft" && <Minecraft />}
                {photo.sticker === "Cat" && <Cat />}
                <img
                  src={photo.image1Url as string}
                  alt={photo.title}
                  className={`h-64 w-full rounded object-cover ${
                    photo.filters ? userFilter(photo.filters as string[]) : ""
                  }`}
                />
              </div>
              <h2 className="text-2xl font-bold">{photo.title}</h2>
              <p className="text-sm text-gray-600">
                Shared on: {formatDate(photo.$createdAt)}
              </p>
              <button
                onClick={() => handleView(photo.$id)}
                className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-600"
              >
                See Photo
              </button>
              <p className="text-gray-600"></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
