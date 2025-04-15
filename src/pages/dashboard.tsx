import { useGetAllPhotosByUser, useGetAllPhotos } from "../hooks/photos.ts";
import { useGetAllSavedPhoto } from "../hooks/saved.ts";
import { useGetAllDownloaded } from "../hooks/downloaded.ts";
import { useGetAllVotes } from "../hooks/votes.ts";
import { useNavigate } from "react-router-dom";
import photoIcon from "../assets/ui/save.png";
import downloadIcon from "../assets/ui/downloading.png";
import heartIcon from "../assets/ui/heart.png";
import sharedPhotoIcon from "../assets/ui/share-photo.png";
import HeartBtn from "../assets/ui/heart2.png";
import SadBtn from "../assets/ui/sad.png";
import Loading from "../components/ui/loading.tsx";
import formatDate from "../utils/functions/format-date.ts";
import userFilter from "../utils/functions/userFilter.ts";
import Axlot from "../components/stickers/axlot/cam.tsx";
import Minecraft from "../components/stickers/minecraft/cam.tsx";
import Cat from "../components/stickers/cat/cam.tsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("id") as string);

  const { data: userPhotos, isLoading: userPhotoLoading } =
    useGetAllPhotosByUser(id);
  const { data: photos, isLoading: photoLoading } = useGetAllPhotos();
  const { data: savedPhotos, isLoading: savedPhotoLoading } =
    useGetAllSavedPhoto(id);
  const { data: downloadedPhotos, isLoading: downloadedLoading } =
    useGetAllDownloaded(id);
  const { data: votes, isLoading: votesLoading } = useGetAllVotes();

  if (
    userPhotoLoading ||
    photoLoading ||
    savedPhotoLoading ||
    downloadedLoading ||
    votesLoading
  )
    return <Loading />;

  const handleView = (id: string) => {
    navigate(`/photo-booth/${id}`);
  };

  const post = photos?.map((photo) => {
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

  const latestPhoto = post
    ?.slice(0, 3)
    .sort((a, b) => Number(b.$createdAt) - Number(a.$createdAt));

  const dashboardData = [
    {
      name: "Saved Photos",
      icon: photoIcon,
      value: savedPhotos?.length || 0,
      bg: "bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400",
    },
    {
      name: "Downloaded Photos",
      icon: downloadIcon,
      value: downloadedPhotos?.length || 0,
      bg: "bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-400",
    },
    {
      name: "Liked Photos",
      icon: heartIcon,
      value: 0,
      bg: "bg-gradient-to-br from-amber-400 via-orange-400 to-red-400",
    },
    {
      name: "Shared Photos",
      icon: sharedPhotoIcon,
      value: userPhotos?.length || 0,
      bg: "bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-bold">Dashboard</h1>

      <div className="flex w-full flex-col gap-1.5 md:grid md:grid-cols-2 md:gap-4">
        {dashboardData.map((data, index) => (
          <div
            key={index}
            className={`flex flex-col bg-gradient-to-br p-4 ${data.bg}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{data.name}</h2>
              <img src={data.icon} alt={data.name} className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold">{data.value}</h2>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-center text-3xl font-bold">Latest Photos</h1>
        {latestPhoto?.length === 0 ? (
          <div className="text-center text-2xl font-bold">
            No posts available
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
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
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={HeartBtn}
                    alt="heart"
                    className="h-7 w-7 cursor-pointer object-cover transition duration-300 ease-in-out hover:scale-120"
                  />
                  <h2 className="text-md photobooth-text-italic font-bold">
                    {photo.heartVoteCount}
                  </h2>
                </div>
                <div
                  className="flex items-center justify-center gap-4"
                  data-votetype={photo.voteType}
                >
                  <img
                    src={SadBtn}
                    alt="sad"
                    className="h-10 w-10 cursor-pointer object-cover transition duration-300 ease-in-out hover:scale-120"
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
              <p className="text-gray-600"></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
