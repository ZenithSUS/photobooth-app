import { getAllPhotos } from "../hooks/photos";
import { useNavigate } from "react-router-dom";
import formatDate from "../utils/functions/format-date";
import Loading from "../components/ui/loading";
import Axlot from "../components/stickers/axlot/cam";
import Minecraft from "../components/stickers/minecraft/cam";
import Cat from "../components/stickers/cat/cam";

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

  console.log(photos);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold mb-4">Socials</h1>
      <div className="grid grid-cols-3 gap-4">
        {photos?.map((photo) => (
          <div
            key={photo.$id}
            className="flex flex-col items-center gap-2.5 bg-white p-4 rounded shadow-md border border-gray-200"
          >
            <div className="relative p-0.5">
              {photo.sticker === "Axlot" && <Axlot />}
              {photo.sticker === "Minecraft" && <Minecraft />}
              {photo.sticker === "Cat" && <Cat />}
              <img
                src={photo.image1Url as string}
                alt={photo.title}
                className="w-full h-52 object-cover rounded"
              />
            </div>
            <h1 className="text-center font-bold">{photo.title}</h1>
            <h2 className="text-center font-bold">Author: {photo.author}</h2>
            <p className="text-sm text-gray-600">
              Shared on: {formatDate(photo.$createdAt)}
            </p>
            <button
              onClick={() => handleView(photo.$id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer transition duration-300 ease-in-out"
            >
              See Photo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
