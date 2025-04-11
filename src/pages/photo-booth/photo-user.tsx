import { getPhoto } from "../../hooks/photos";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/functions/format-date";
import {
  getBackgroundColor,
  getBorderColor,
} from "../../utils/constants/user-backgrounds";
import Loading from "../../components/ui/loading";
import Axlot from "../../components/stickers/axlot/img";
import Minecraft from "../../components/stickers/minecraft/img";
import Cat from "../../components/stickers/cat/img";

export default function PhotoUser() {
  const { id } = useParams();
  const { data: photo, isLoading, error } = getPhoto(id as string);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/social");
  };

  if (!photo)
    return (
      <div className="text-center text-3xl font-bold">No photo available</div>
    );
  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="text-center text-3xl font-bold">
        Error: {error.message}
      </div>
    );

  const images = [photo.image1Url, photo.image2Url, photo.image3Url];

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center gap-2 p-4">
      <h1 className="text-2xl font-bold">{photo.title}</h1>
      <div
        className={`grid grid-cols-1 place-items-center ${getBackgroundColor(Number(photo.background))} ${getBorderColor(Number(photo.border))} gap-2 rounded-lg border-10 border-amber-400 bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-3.5 shadow-lg`}
      >
        {images.map((image, index) => (
          <div className="relative p-0.5" key={index}>
            {photo.sticker === "Axlot" && <Axlot set={index + 1} />}
            {photo.sticker === "Minecraft" && <Minecraft set={index + 1} />}
            {photo.sticker === "Cat" && <Cat set={index + 1} />}
            <img
              src={image as string}
              alt={`Image ${index + 1}`}
              className="object-cover"
              height={"300px"}
              width={"300px"}
            />
          </div>
        ))}
      </div>

      <div className="w-full rounded-2xl bg-gradient-to-br from-white via-slate-300 to-zinc-300 p-3 text-center">
        <p className="text-lg font-bold">
          {formatDate(photo.$createdAt as string)}
        </p>
      </div>

      <button
        onClick={handleBack}
        className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  );
}
