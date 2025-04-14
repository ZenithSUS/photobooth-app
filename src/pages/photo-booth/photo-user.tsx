import { useGetPhoto } from "../../hooks/photos";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCreateSavedPhoto } from "../../hooks/saved";
import formatDate from "../../utils/functions/format-date";
import userFilter from "../../utils/functions/userFilter";
import userBackground from "../../utils/functions/userBackground";
import Loading from "../../components/ui/loading";
import Axlot from "../../components/stickers/axlot/img";
import Minecraft from "../../components/stickers/minecraft/img";
import Cat from "../../components/stickers/cat/img";
import BackIcon from "../../assets/ui/back.svg";
import SaveIcon from "../../assets/ui/save.png";
import { toast } from "react-toastify";

export default function PhotoUser() {
  const { id } = useParams();
  const { mutate: createSaved } = useCreateSavedPhoto();
  const { data: photo, isLoading, error } = useGetPhoto(id as string);
  let userFilters = "";
  let userBg = "";
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/social");
  };

  if (isLoading) return <Loading />;

  if (!photo) {
    navigate("/social");
    return null;
  }

  if (error)
    return (
      <div className="text-center text-3xl font-bold">
        Error: {error.message}
      </div>
    );

  if (photo.filters && photo.border && photo.background) {
    userFilters = userFilter(photo.filters as string[]);
    userBg = userBackground(Number(photo.background), Number(photo.border));
  }

  const images = [photo.image1Url, photo.image2Url, photo.image3Url];

  const handleSave = (photoID: string, userID: string) => {
    createSaved(
      {
        photoID: photoID,
        userID: userID,
      },
      {
        onSuccess: () => {
          toast.success("Saved Successfully");
        },
        onError: (error) => {
          if (error instanceof Error) {
            toast.error(error.message);
            console.error("Error adding user", error);
          }
        },
      },
    );
  };

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center gap-2 p-4">
      <h1 className="text-2xl font-bold">{photo.title}</h1>
      <div
        className={`grid grid-cols-1 place-items-center ${userBg} gap-2 rounded-lg border-10 border-amber-400 bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-3.5 shadow-lg`}
      >
        {images.map((image, index) => (
          <div className="relative p-0.5" key={index}>
            {photo.sticker === "Axlot" && <Axlot set={index + 1} />}
            {photo.sticker === "Minecraft" && <Minecraft set={index + 1} />}
            {photo.sticker === "Cat" && <Cat set={index + 1} />}
            <img
              src={image as string}
              alt={`Image ${index + 1}`}
              className={`object-cover ${userFilters}`}
              height={"300px"}
              width={"300px"}
            />
          </div>
        ))}
        <div className="w-full bg-gradient-to-br from-white via-slate-300 to-zinc-300 p-3 text-center">
          <p className="text-lg font-bold">
            {formatDate(photo.$createdAt as string)}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleBack}
          className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
        >
          <img src={BackIcon} alt="Back" className="h-6 w-6" />
        </button>
        <button
          onClick={() => handleSave(photo.$id ?? "", photo.userID ?? "")}
          className="cursor-pointer rounded bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600"
        >
          <img src={SaveIcon} alt="Save" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
