import { useGetAllPhotosByUser } from "../hooks/photos";
import { useGetAllVotes } from "../hooks/votes";
import { useGetUser } from "../hooks/users";
import { useParams, useNavigate } from "react-router-dom";
import formatDate from "../utils/functions/format-date";
import unknown from "../assets/ui/unknown.jpg";
import Modal from "react-modal";
import Loading from "../components/ui/loading";
import Card from "../components/card";
import posts from "../utils/functions/posts";

Modal.setAppElement("#root");

export default function VisitAccount() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useGetUser(id as string);
  const { data: photos, isLoading: photosLoading } = useGetAllPhotosByUser(
    id as string,
  );
  const { data: votes, isLoading: votesLoading } = useGetAllVotes();

  const joined = formatDate(
    JSON.parse(localStorage.getItem("joined") as string),
  );
  if (!user) {
    navigate("/dashboard");
    return null;
  }

  if (photosLoading || votesLoading || userLoading) return <Loading />;

  const name = user.name;
  const email = user.email;
  const profileImage = user.profileImage;
  const userPosts = posts(photos!, votes!);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-bold">Account</h1>
      <div className="bg-neutral-light relative flex flex-col gap-2 rounded-md p-4 shadow-md shadow-black/50">
        <div className="flex flex-col gap-2 overflow-hidden">
          <div className="grid grid-cols-1 place-items-center gap-1.5 text-center">
            <img
              src={
                profileImage !== null && profileImage !== "N/A"
                  ? profileImage
                  : unknown
              }
              alt="profile_img"
              className="h-24 w-24 rounded-full"
            />
            <h2 className="text-2xl font-bold">{name}</h2>
          </div>

          <div className="grid grid-cols-1 place-items-center gap-1.5">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">
                Email: <span className="font-medium">{email}</span>
              </h2>
              <h2 className="text-lg font-bold">
                Joined: <span className="font-medium">{joined}</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-center text-3xl font-bold">User Posts</h1>
        {userPosts.length === 0 && (
          <h2 className="text-center text-2xl">No posts</h2>
        )}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {userPosts.map((post) => (
            <Card key={post.$id} photo={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
