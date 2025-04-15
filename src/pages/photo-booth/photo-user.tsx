import { useRef, useTransition } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetPhoto } from "../../hooks/photos";
import { useCreateSavedPhoto } from "../../hooks/saved";
import { useCreateDownloaded } from "../../hooks/downloaded";
import {
  useCreateVote,
  useDeleteVote,
  useUpdateVote,
  useGetAllVotes,
} from "../../hooks/votes";
import { sleep } from "../../utils/functions/sleep";
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
import SadBtn from "../../assets/ui/sad.png";

export default function PhotoUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const userID = JSON.parse(localStorage.getItem("id") as string);
  const { mutate: createSaved } = useCreateSavedPhoto();
  const { mutate: createDownload } = useCreateDownloaded();
  const { mutate: createVote } = useCreateVote();
  const { mutate: deleteVote } = useDeleteVote();
  const { mutate: updateVote } = useUpdateVote();
  const { data: votes, isLoading: votesLoading } = useGetAllVotes();
  const { data: photo, isLoading: photoLoading } = useGetPhoto(id as string);
  const photoBoothRef = useRef<HTMLDivElement>(null);

  let userFilters = "";
  let userBg = "";

  const handleBack = () => {
    navigate("/social");
  };

  if (photoLoading || votesLoading) return <Loading />;

  if (!photo || !votes) {
    navigate("/social");
    return null;
  }

  const photoVotes =
    votes?.filter((vote) => vote.photo.$id === photo.$id) || [];

  const heartVoteCount = photoVotes.filter(
    (vote) => vote.voteType === "Heart",
  ).length;
  const sadVoteCount = photoVotes.filter(
    (vote) => vote.voteType === "Sad",
  ).length;

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

  const handleVote = (voteType: string, photoId: string) => {
    startTransition(async () => {
      const user = userID;

      const existingVote = votes?.find(
        (vote) => vote.photo.$id === photoId && vote.user.$id === user,
      );

      if (existingVote) {
        if (existingVote.voteType === voteType) {
          deleteVote(existingVote.$id);
          await sleep(1000);
        } else {
          updateVote({ documentID: existingVote.$id, voteType });
          await sleep(1000);
        }
      } else {
        createVote({ voteType, photo: photoId, user });
        await sleep(1000);
      }
    });
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
          <div className="flex items-center justify-center">
            <div className="flex cursor-pointer items-center justify-center gap-4">
              <button
                className="disabled:opacity-75"
                disabled={isPending}
                onClick={() => handleVote("Heart", photo.$id as string)}
              >
                <img
                  src={HeartBtn}
                  alt="heart"
                  className="h-24 w-24 cursor-pointer object-cover transition duration-300 ease-in-out hover:scale-120 lg:h-28 lg:w-28"
                />
              </button>
              <h2 className="text-md photobooth-text-italic font-bold">
                {heartVoteCount || 0}
              </h2>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                className="disabled:opacity-75"
                disabled={isPending}
                onClick={() => handleVote("Sad", photo.$id as string)}
              >
                <img
                  src={SadBtn}
                  alt="sad"
                  className="h-32 w-32 cursor-pointer object-cover transition duration-300 ease-in-out hover:scale-120"
                />
              </button>
              <h2 className="text-md photobooth-text-italic font-bold">
                {sadVoteCount || 0}
              </h2>
            </div>
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

        {photo.userID === userID && (
          <>
            <button
              onClick={() => handleSave(photo.$id ?? "", photo.userID ?? "")}
              className="cursor-pointer rounded bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600"
            >
              <img src={SaveIcon} alt="Save" className="h-6 w-6" />
            </button>
            <button
              onClick={() =>
                handleDownload(photo.$id ?? "", photo.userID ?? "")
              }
              className="cursor-pointer rounded bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600"
            >
              <img src={DownloadIcon} alt="Save" className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
