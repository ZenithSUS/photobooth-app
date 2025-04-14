import { useFetchAllPhoto } from "../hooks/saved";
import Axlot from "../components/stickers/axlot/cam";
import Minecraft from "../components/stickers/minecraft/cam";
import Cat from "../components/stickers/cat/cam";
import Loading from "../components/ui/loading";
import formatDate from "../utils/functions/format-date";
import userFilter from "../utils/functions/userFilter";
import { useNavigate } from "react-router-dom";

export default function Photo() {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("id") || ("" as string));
  const {
    data: savedPhotos,
    isLoading,
    error,
  } = useFetchAllPhoto(id as string);

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="text-center text-3xl font-bold">
        Error: {error.message}
      </div>
    );

  const handleView = (id: string) => {
    navigate(`/photo-booth/${id}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-bold">Saved Photos</h1>

      {savedPhotos?.length === 0 && (
        <div className="text-center text-lg">No Saved Photos</div>
      )}

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {savedPhotos?.map(({ photoID }) => (
          <div
            key={photoID.$id}
            className="flex flex-col items-center gap-2.5 rounded border border-gray-200 bg-white p-4 shadow-md"
          >
            <div className="relative w-full p-0.5">
              {photoID.sticker === "Axlot" && <Axlot />}
              {photoID.sticker === "Minecraft" && <Minecraft />}
              {photoID.sticker === "Cat" && <Cat />}
              <img
                src={photoID.image1Url as string}
                alt={photoID.title}
                className={`h-52 w-full rounded object-cover${
                  photoID.filters ? userFilter(photoID.filters as string[]) : ""
                }`}
              />
            </div>
            <h1 className="text-center font-bold">{photoID.title}</h1>
            <h2 className="text-center font-bold">Author: {photoID.author}</h2>
            <p className="text-sm text-gray-600">
              Shared on: {formatDate(photoID.$createdAt)}
            </p>
            <button
              onClick={() => handleView(photoID.$id)}
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
