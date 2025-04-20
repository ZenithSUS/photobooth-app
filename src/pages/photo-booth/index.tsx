import { useBoothContext } from "../../lib/context/booth";
import { useRef, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../../appwrite";
import { toast } from "react-toastify";
import LogoutIcon from "../../assets/ui/logout.png";
import Modal from "react-modal";
import Camera from "../../components/ui/camera";
import Customization from "../../components/ui/customization";
import getCurrentSticker from "../../components/ui/cam-sticker";

Modal.setAppElement("#root");

export default function PhotoBooth() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    capturedImage,
    prevFilter,
    backgroundColor,
    borderColor,
    sticker,
    isCapturing,
  } = useBoothContext();
  const photoBoothRef = useRef<HTMLDivElement>(null);
  const name = JSON.parse(localStorage.getItem("name") as string) || null;

  const logout = async () => {
    try {
      startTransition(async () => {
        await account.deleteSession("current");
        localStorage.clear();
        navigate("/login");
      });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
      console.error("Logout error:", error);
    }
  };

  const closeLogoutModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        parentSelector={() => document.querySelector("#root") as HTMLElement}
        isOpen={isModalOpen}
        onRequestClose={closeLogoutModal}
        className={
          "bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
        }
        overlayClassName={
          "fixed inset-0 z-40 bg-black/50 bg-opacity-50 backdrop-blur-sm"
        }
      >
        <div className="z-20 flex flex-col items-center gap-4 rounded-xl bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-5">
          <h1 className="text-xl font-bold">
            Are you sure you want to logout?
          </h1>
          <div className="flex gap-4">
            <button
              className="cursor-pointer rounded-xl bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 p-2 font-semibold transition duration-300 ease-in-out hover:scale-105 hover:from-green-500 hover:via-emerald-500 hover:to-teal-500 disabled:bg-gradient-to-br disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400"
              onClick={logout}
              disabled={isPending}
              type="button"
            >
              Confirm
            </button>
            <button
              onClick={closeLogoutModal}
              type="button"
              disabled={isPending}
              className="cursor-pointer rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-2 font-semibold transition duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-br hover:from-red-400 hover:via-rose-400 hover:to-pink-400 disabled:bg-gradient-to-br disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col place-items-center gap-1.5 md:grid md:grid-cols-3">
        <div className="hidden md:block"></div>

        <h1 className="photobooth-text-italic text-center text-3xl">
          ZenithBooth
        </h1>

        <div className="m-2 flex flex-col items-center justify-center gap-2 md:flex-row md:justify-end">
          <h1 className="text-2xl">
            {name !== null || "" ? (
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <p className="text-md lg:text-md text-center font-semibold">
                  {name}
                </p>
                <button
                  className="text-md cursor-pointer rounded-md bg-red-500 p-2 font-bold duration-300 ease-in-out hover:scale-105 hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-500"
                  onClick={() => setIsModalOpen(true)}
                  disabled={isPending}
                >
                  <img src={LogoutIcon} alt="logout" className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="font-semibold">Guest User</div>
            )}
          </h1>
          {name === null && (
            <button
              className="cursor-pointer rounded-md bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-1 text-lg font-semibold transition duration-300 ease-in-out hover:scale-95 hover:from-blue-500 hover:via-blue-500 hover:to-indigo-500"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>

      <div className="m-4 place-items-start place-self-center">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-2 self-start">
            <h1 className="text-3xl font-bold">Take a selfie</h1>
            <Camera photoBoothRef={photoBoothRef} />
          </div>

          <div
            className={`self-center ${isCapturing || capturedImage.length > 0 ? "hidden" : ""}`}
          >
            <h1 className="mb-4 text-center text-2xl font-bold">
              Photo Booth Customization
            </h1>
            <Customization />
          </div>

          <div
            className={`flex flex-col items-center gap-2 p-4 ${isCapturing || capturedImage.length > 0 ? "" : "hidden"}`}
          >
            <h2 className="text-center text-2xl font-bold">Captured Image</h2>

            {capturedImage.length > 0 ? (
              <div
                className={`flex flex-col items-center justify-center gap-0.5 p-2 ${backgroundColor} border-10 ${borderColor}`}
                ref={photoBoothRef}
              >
                {capturedImage.map((image, index) => {
                  const imageUrl = URL.createObjectURL(image as Blob);
                  return (
                    <div className="relative p-0.5" key={index}>
                      {getCurrentSticker({
                        sticker,
                        set: index + 1,
                        type: "Image",
                      })}
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Captured Image ${index}`}
                        height={"300px"}
                        width={"300px"}
                        className={`p-0.5 grayscale-${prevFilter[index].grayscale} sepia-${prevFilter[index].sepia} hue-rotate-${prevFilter[index].hueRotate} ${prevFilter[index].invert === "100" ? "invert" : `invert-${prevFilter[index].invert}`} brightness-${prevFilter[index].brightness} contrast-${prevFilter[index].contrast}`}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-lg">No images captured yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
