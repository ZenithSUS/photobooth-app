import { useGetAllPhotos } from "../hooks/photos";
import { useGetAllVotes } from "../hooks/votes";
import { useCreateVote } from "../hooks/votes";
import { useNavigate } from "react-router-dom";
import formatDate from "../utils/functions/format-date";
import Loading from "../components/ui/loading";
import Axlot from "../components/stickers/axlot/cam";
import Minecraft from "../components/stickers/minecraft/cam";
import Cat from "../components/stickers/cat/cam";
import userFilter from "../utils/functions/userFilter";
import HeartBtn from "../assets/ui/heart2.png";
import SadBtn from "../assets/ui/sad.png";

export default function Social() {
  const id = JSON.parse(localStorage.getItem("id") as string);
  const { data: photos, isLoading: photosLoading } = useGetAllPhotos();
  const { data: votes, isLoading: votesLoading } = useGetAllVotes();
  const { mutate: createVote } = useCreateVote();
  const navigate = useNavigate();

  if (photosLoading || votesLoading) {
    return <Loading />;
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center text-3xl font-bold">No photos available</div>
    );
  }

  const handleVote = (voteType: string, photoId: string) => {
    const photo = photoId;
    const user = id;
    console.log(`Vote Type: ${voteType}, Photo ID: ${photo}, UserId ${user}`);

    createVote({ voteType, photo, user });
  };

  const post = photos.map((photo) => {
    const photoVotes =
      votes?.filter((vote) => vote.photo.$id === photo.$id) || [];

    const heartVoteCount = photoVotes.filter(
      (vote) => vote.voteType === "Heart",
    ).length;
    const sadVoteCount = photoVotes.filter(
      (vote) => vote.voteType === "Sad",
    ).length;

    const voteType = photoVotes[0]?.voteType || "N/A";

    return { ...photo, heartVoteCount, sadVoteCount, voteType };
  });

  const handleView = (id: string) => {
    navigate(`/photo-booth/${id}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-bold">Socials</h1>

      {post.length === 0 && (
        <div className="text-md text-center">No Saved Photos</div>
      )}

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {post.map((photo) => (
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
            <div className="gap- flex items-center">
              <div className="flex cursor-pointer items-center justify-center gap-4">
                <img
                  src={HeartBtn}
                  alt="heart"
                  className="h-8 w-8 cursor-pointer object-cover transition duration-300 ease-in-out hover:scale-120"
                  onClick={() => handleVote("Heart", photo.$id)}
                />
                <h2 className="text-md photobooth-text-italic font-bold">
                  {photo.heartVoteCount}
                </h2>
              </div>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={SadBtn}
                  alt="sad"
                  className="h-10 w-10 cursor-pointer object-cover transition duration-300 ease-in-out hover:scale-120"
                  onClick={() => handleVote("Sad", photo.$id)}
                />
                <h2 className="text-md photobooth-text-italic font-bold">
                  {photo.sadVoteCount}
                </h2>
              </div>
            </div>
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
