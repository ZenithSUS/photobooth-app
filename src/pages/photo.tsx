import { useNavigate } from "react-router-dom";
import { useGetAllSavedPhoto } from "../hooks/saved";
import { useGetAllVotes } from "../hooks/votes";
import Axlot from "../components/stickers/axlot/cam";
import Minecraft from "../components/stickers/minecraft/cam";
import Cat from "../components/stickers/cat/cam";
import Loading from "../components/ui/loading";
import formatDate from "../utils/functions/format-date";
import userFilter from "../utils/functions/userFilter";
import HeartBtn from "../assets/ui/heart2.png";
import SadBtn from "../assets/ui/sad.png";

export default function Photo() {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("id") || ("" as string));
  const { data: savedPhotos, isLoading: savedPhotoLoading } =
    useGetAllSavedPhoto(id as string);
  const { data: votes, isLoading: votesLoading } = useGetAllVotes();

  if (savedPhotoLoading || votesLoading) return <Loading />;

  if (!savedPhotos || savedPhotos.length === 0) {
    return (
      <div className="text-center text-3xl font-bold">No photos available</div>
    );
  }

  const post = savedPhotos.map((photo) => {
    const photoVotes =
      votes?.filter((vote) => vote.photo.$id === photo.photoID.$id) || [];

    const heartVoteCount = photoVotes.filter(
      (vote) => vote.voteType === "Heart",
    ).length;
    const sadVoteCount = photoVotes.filter(
      (vote) => vote.voteType === "Sad",
    ).length;

    const voteType = photoVotes[0]?.voteType || "N/A";

    return { ...photo, heartVoteCount, sadVoteCount, voteType };
  });
  console.log(post);

  const handleView = (id: string) => {
    navigate(`/photo-booth/${id}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-bold">Saved Photos</h1>

      {post.length === 0 && (
        <div className="text-center text-lg">No Saved Photos</div>
      )}

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {post.map(
          ({ photoID, $id, heartVoteCount, sadVoteCount, voteType }) => (
            <div
              key={$id}
              className="flex flex-col items-center gap-2.5 rounded border border-gray-200 bg-white p-4 shadow-md"
            >
              <div className="relative w-full p-0.5">
                {photoID.sticker === "Axlot" && <Axlot />}
                {photoID.sticker === "Minecraft" && <Minecraft />}
                {photoID.sticker === "Cat" && <Cat />}
                <img
                  src={photoID.image1Url as string}
                  alt={photoID.title}
                  className={`h-52 w-full rounded object-cover ${
                    photoID.filters
                      ? userFilter(photoID.filters as string[])
                      : ""
                  }`}
                />
              </div>
              <h1 className="text-center font-bold">{photoID.title}</h1>
              <h2 className="text-center font-bold">
                Author: {photoID.author}
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={HeartBtn}
                    alt="heart"
                    className="h-7 w-7 cursor-pointer object-cover transition duration-300 ease-in-out hover:scale-120"
                  />
                  <h2 className="text-md photobooth-text-italic font-bold">
                    {heartVoteCount}
                  </h2>
                </div>
                <div
                  className="flex items-center justify-center gap-4"
                  data-votetype={voteType}
                >
                  <img
                    src={SadBtn}
                    alt="sad"
                    className="h-10 w-10 cursor-pointer object-cover transition duration-300 ease-in-out hover:scale-120"
                  />
                  <h2 className="text-md photobooth-text-italic font-bold">
                    {sadVoteCount}
                  </h2>
                </div>
              </div>
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
          ),
        )}
      </div>
    </div>
  );
}
