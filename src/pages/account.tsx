import { useState } from "react";
import formatDate from "../utils/functions/format-date";
import unknown from "../assets/ui/unknown.jpg";
import Modal from "react-modal";
import {
  ChangePasswordModal,
  ChangeProfileModal,
} from "../components/ui/modals";

Modal.setAppElement("#root");

export default function Account() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const name = JSON.parse(localStorage.getItem("name") as string);
  const email = JSON.parse(localStorage.getItem("email") as string);
  const profileImage = JSON.parse(
    localStorage.getItem("profileImage") || ("" as string),
  );

  const joined = formatDate(
    JSON.parse(localStorage.getItem("joined") as string),
  );

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
      <div className="relative flex flex-col gap-2 rounded-md bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-4 shadow-md shadow-sky-400">
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
              <h2 className="text-lg">Email: {email}</h2>
              <h2 className="text-lg">Joined: {joined}</h2>
            </div>

            <div className="m-2 flex flex-col items-center justify-center gap-2">
              <button
                className="cursor-pointer rounded-md bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-2 text-lg duration-300 ease-in-out hover:scale-105 hover:from-amber-500 hover:via-orange-500 hover:to-red-500"
                onClick={() => openModal("password")}
              >
                Change Password
              </button>
              <button
                className="cursor-pointer rounded-md bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-2 text-lg duration-300 ease-in-out hover:scale-105 hover:from-amber-500 hover:via-orange-500 hover:to-red-500"
                onClick={() => openModal("profile")}
              >
                Change Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
