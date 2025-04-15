import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetPhoto } from "../../hooks/photos";
import { useCreateSavedPhoto } from "../../hooks/saved";
import { useCreateDownloaded } from "../../hooks/downloaded";
import { toast } from "react-toastify";
import downloadAllImages from "../../utils/functions/download";
import formatDate from "../../utils/functions/format-date";
import userFilter from "../../utils/functions/userFilter";
import userBackground from "../../utils/functions/userBackground";
import Loading from "../../components/ui/loading";
import Axlot from "../../components/stickers/axlot/img";
import Minecraft from "../../components/stickers/minecraft/img";
import Cat from "../../components/stickers/cat/img";
import BackIcon from "../../assets/ui/back.svg";
import SaveIcon from "../../assets/ui/save.png";
import DownloadIcon from "../../assets/ui/downloading.png";
import HeartBtn from "../../assets/ui/heart2.png";

export default function PhotoUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const userID = JSON.parse(localStorage.getItem("id") as string);
  const { mutate: createSaved } = useCreateSavedPhoto();
  const { mutate: createDownload } = useCreateDownloaded();
  const { data: photo, isLoading, error } = useGetPhoto(id as string);
  const photoBoothRef = useRef<HTMLDivElement>(null);

  let userFilters = "";
  let userBg = "";

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

  const handleDownload = async (photoID: string, userID: string) => {
    try {
      await downloadAllImages({
        photoBoothRef: photoBoothRef as React.RefObject<HTMLDivElement>,
      });
      createDownload({
        photoID: photoID,
        userID: userID,
      });
    } catch (error) {
      toast.error("There is something wrong when downloading an image");
    }
  };

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
      <div className="m1 m-1 grid grid-cols-1 place-items-center lg:grid-cols-2">
        <div
          ref={photoBoothRef}
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
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-center text-3xl">Votes</h1>
          <div className="flex items-center justify-center gap-4">
            <img
              src={HeartBtn}
              alt="heart"
              className="h-20 w-20 object-cover"
            />
            <h2 className="photobooth-text-italic text-2xl font-bold">0</h2>
          </div>
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
        {photo.userID === userID && (
          <button
            onClick={() => handleDownload(photo.$id ?? "", photo.userID ?? "")}
            className="cursor-pointer rounded bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600"
          >
            <img src={DownloadIcon} alt="Save" className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}
