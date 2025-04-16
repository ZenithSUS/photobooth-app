import { useGetAllPhotos } from "../hooks/photos";
import { useGetAllVotes } from "../hooks/votes";
import Loading from "../components/ui/loading";
import Card from "../components/card";
import posts from "../utils/functions/posts";

export default function Social() {
  const { data: photos, isLoading: photosLoading } = useGetAllPhotos();
  const { data: votes, isLoading: votesLoading } = useGetAllVotes();

  if (photosLoading || votesLoading) {
    return <Loading />;
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center text-3xl font-bold">No photos available</div>
    );
  }
  const post = posts(photos, votes!);
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-bold">Socials</h1>

      {post.length === 0 && (
        <div className="text-md text-center">No Saved Photos</div>
      )}

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {post.map((photo) => (
          <Card key={photo.$id} photo={photo} />
        ))}
      </div>
    </div>
  );
}
