import { getAllPhotos } from "../hooks/photos";
import { useNavigate } from "react-router-dom";
import formatDate from "../utils/functions/format-date";
import Loading from "../components/ui/loading";
import Axlot from "../components/stickers/axlot/cam";
import Minecraft from "../components/stickers/minecraft/cam";
import Cat from "../components/stickers/cat/cam";
import userFilter from "../utils/functions/userFilter";

export default function Social() {
  const { data: photos, isLoading } = getAllPhotos();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center text-3xl font-bold">No photos available</div>
    );
  }

  const handleView = (id: string) => {
    navigate(`/photo-booth/${id}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="mb-4 text-center text-3xl font-bold lg:text-start">
        Socials
      </h1>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {photos?.map((photo) => (
          <div
            key={photo.$id}
            className="flex flex-col items-center gap-2.5 rounded border border-gray-200 bg-white p-4 shadow-md"
          >
            <div className="relative p-0.5">
              {photo.sticker === "Axlot" && <Axlot />}
              {photo.sticker === "Minecraft" && <Minecraft />}
              {photo.sticker === "Cat" && <Cat />}
              <img
                src={photo.image1Url as string}
                alt={photo.title}
                className={`h-52 w-full rounded object-cover ${userFilter(
                  photo.filters as string[],
                )}`}
              />
            </div>
            <h1 className="text-center font-bold">{photo.title}</h1>
            <h2 className="text-center font-bold">Author: {photo.author}</h2>
            <p className="text-sm text-gray-600">
              Shared on: {formatDate(photo.$createdAt)}
            </p>
            <button
              onClick={() => handleView(photo.$id)}
              className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-600"
            >
              See Photo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
