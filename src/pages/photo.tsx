import { useGetAllSavedPhoto } from "../hooks/saved";
import { useGetAllVotes } from "../hooks/votes";
import Loading from "../components/ui/loading";
import Card from "../components/card";

export default function Photo() {
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

  const post = savedPhotos.map(({ photoID }) => {
    const photoVotes =
      votes?.filter((vote) => vote.photo.$id === photoID.$id) || [];

    const heartVoteCount = photoVotes.filter(
      (vote) => vote.voteType === "Heart",
    ).length;
    const sadVoteCount = photoVotes.filter(
      (vote) => vote.voteType === "Sad",
    ).length;
    const coolVoteCount = photoVotes.filter(
      (vote) => vote.voteType === "Cool",
    ).length;
    const wowVoteCount = photoVotes.filter(
      (vote) => vote.voteType === "Wow",
    ).length;

    const voteType = photoVotes[0]?.voteType || "N/A";

    return {
      ...photoID,
      heartVoteCount,
      sadVoteCount,
      coolVoteCount,
      wowVoteCount,
      voteType,
    };
  });

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-bold">Saved Photos</h1>

      {post.length === 0 && (
        <div className="text-center text-lg">No Saved Photos</div>
      )}

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {post.map((photo) => (
          <Card key={photo.$id} photo={photo} />
        ))}
      </div>
    </div>
  );
}
