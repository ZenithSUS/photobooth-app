import { useGetAllPhotosByUser, useGetAllPhotos } from "../hooks/photos.ts";
import { useGetAllSavedPhoto } from "../hooks/saved.ts";
import { useGetAllDownloaded } from "../hooks/downloaded.ts";
import { useGetAllVotes } from "../hooks/votes.ts";

import photoIcon from "../assets/ui/save.png";
import downloadIcon from "../assets/ui/downloading.png";
import heartIcon from "../assets/ui/heart.png";
import sharedPhotoIcon from "../assets/ui/share-photo.png";
import Loading from "../components/ui/loading.tsx";
import Card from "../components/card.tsx";
import posts from "../utils/functions/posts.ts";

export default function Dashboard() {
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

  const post = posts(photos!, votes!);

  const userVotes = votes?.filter((vote) => vote.user.$id === id).length || 0;

  const latestPhoto = post
    ?.slice(0, 4)
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
      value: userVotes || 0,
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

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
          {latestPhoto?.map((photo) => <Card key={photo.$id} photo={photo} />)}
        </div>
      </div>
    </div>
  );
}
