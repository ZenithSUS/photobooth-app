import { useState } from "react";
import formatDate from "../utils/functions/format-date";
import unknown from "../assets/ui/unknown.jpg";
import Modal from "react-modal";
import {
  ChangePasswordModal,
  ChangeProfileModal,
} from "../components/ui/modals";
import { useGetAllPhotosByUser } from "../hooks/photos";
import { useGetAllVotes } from "../hooks/votes";
import Loading from "../components/ui/loading";
import Card from "../components/card";
import posts from "../utils/functions/posts";

Modal.setAppElement("#root");

export default function Account() {
  const userID = JSON.parse(localStorage.getItem("id") as string);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { data: photos, isLoading: photosLoading } =
    useGetAllPhotosByUser(userID);
  const { data: votes, isLoading: votesLoading } = useGetAllVotes();
  const name = JSON.parse(localStorage.getItem("name") as string);
  const email = JSON.parse(localStorage.getItem("email") as string);
  const profileImage = JSON.parse(
    localStorage.getItem("profileImage") || ("" as string),
  );

  const joined = formatDate(
    JSON.parse(localStorage.getItem("joined") as string),
  );

  if (photosLoading || votesLoading) return <Loading />;

  const userPosts = posts(photos!, votes!);

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="flex flex-col gap-5">
      <ChangePasswordModal
        isModalOpen={activeModal === "password"}
        setIsModalOpen={() => closeModal()}
      />

      <ChangeProfileModal
        isModalOpen={activeModal === "profile"}
        setIsModalOpen={() => closeModal()}
      />

      <h1 className="text-center text-3xl font-bold">Account</h1>
      <div className="relative flex flex-col gap-2 rounded-md bg-gradient-to-b from-sky-400 via-blue-400 to-indigo-400 p-4 shadow-md shadow-black/50">
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

            <div className="m-2 flex flex-col items-center justify-center gap-2">
              <button
                className="cursor-pointer rounded-md bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-2 text-lg font-semibold duration-300 ease-in-out hover:scale-105 hover:from-amber-500 hover:via-orange-500 hover:to-red-500"
                onClick={() => openModal("password")}
              >
                Change Password
              </button>
              <button
                className="cursor-pointer rounded-md bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-2 text-lg font-semibold duration-300 ease-in-out hover:scale-105 hover:from-amber-500 hover:via-orange-500 hover:to-red-500"
                onClick={() => openModal("profile")}
              >
                Change Image
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-center text-3xl font-bold">Your Posts</h1>
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
