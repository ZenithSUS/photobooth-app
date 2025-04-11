import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoothContext } from "../../lib/context/booth.tsx";
import { messages } from "../../utils/constants/message.ts";
import { BlinkBlur } from "react-loading-indicators";
import Modal from "react-modal";
import Webcam from "react-webcam";
import filters from "../../utils/functions/filters.ts";
import shareImages from "../../utils/functions/share.ts";
import downloadAllImages from "../../utils/functions/download.ts";
import resetPic from "../../assets/ui/reset.png";
import backPic from "../../assets/ui/back.svg";
import Axlot from "../stickers/axlot/cam.tsx";
import Minecraft from "../stickers/minecraft/cam.tsx";
import Cat from "../stickers/cat/cam.tsx";

Modal.setAppElement("#root");

export default function Camera({
  photoBoothRef,
}: {
  photoBoothRef: React.RefObject<HTMLDivElement | null>;
}) {
  const name = JSON.parse(localStorage.getItem("name") as string);
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webCamReady, setWebCamReady] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");

  const {
    capturedImage,
    setCapturedImage,
    filter,
    setPrevFilter,
    setFilter,
    backgroundColor,
    setBackgroundColor,
    borderColor,
    setBorderColor,
    isCapturing,
    setIsCapturing,
    sticker,
    setSticker,
  } = useBoothContext();
  const {
    sepiaFilter,
    grayscaleFilter,
    hueRotateFilter,
    invertFilter,
    brightnessFilter,
    contrastFilter,
  } = filters;

  const resetFilter = () => {
    setFilter({
      sepia: 0,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      brightness: 100,
      contrast: 100,
    });
    setPrevFilter([]);
    setBackgroundColor(
      "bg-gradient-to-br from-amber-400 via-orange-400 to-red-400"
    );
    setBorderColor("border-sky-400");
  };

  const handleDownload = () => {
    downloadAllImages({
      photoBoothRef: photoBoothRef as React.RefObject<HTMLDivElement>,
    });
  };

  const GoBack = () => {
    if (capturedImage.length > 0) {
      if (!window.confirm("Are you sure you want to go back?")) return;
    }

    setCapturedImage([]);
    setPrevFilter([]);
    resetFilter();
    setSticker("N/A");
    navigate("/");
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const byteString = atob(imageSrc.split(",")[1]);
      const arrayBuffer = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        arrayBuffer[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([arrayBuffer], { type: "image/jpeg" });

      setPrevFilter((prev) => [...prev, { ...filter }]);
      setCapturedImage((prev) => [...prev, blob]);
    } else {
      console.error("Failed to capture image. Ensure webcam is active.");
    }
  }, [webcamRef, filter, setPrevFilter, setCapturedImage]);

  const startTimer = useCallback(() => {
    let countdown = 3;
    let capturesRemaining = 3;
    setTimer(countdown);
    setIsCapturing(true);

    const interval = setInterval(() => {
      countdown -= 1;
      setTimer(countdown);

      if (countdown === 0) {
        capture();
        capturesRemaining -= 1;

        if (capturesRemaining > 0) {
          countdown = 3;
          setTimer(countdown);
        } else {
          clearInterval(interval);
          setTimer(null);
          setIsCapturing(false);
        }
      }
    }, 1000);
  }, [capture]);

  const resetImage = useCallback(() => {
    setCapturedImage([]);
    setPrevFilter([]);
    resetFilter();
    setSticker("N/A");
  }, [setCapturedImage]);

  const handleShare = async () => {
    try {
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const shareImage = async (e: React.FormEvent, title: string) => {
    try {
      e.preventDefault();
      await shareImages(
        capturedImage as Blob[],
        setCapturedImage,
        setIsModalOpen,
        name,
        title,
        sticker
      );
    } catch (error) {
      console.log(error);
    }
  };

  const videoConstraints = {
    width: 480,
    height: 300,
    facingMode: "user",
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Modal
        isOpen={isModalOpen}
        parentSelector={() => document.querySelector("#root") as HTMLElement}
        className={
          "grid absolute inset-x-4 top-1/8 place-items-center z-50 max-w-lg w-full mx-auto p-4 sm:inset-x-8 sm:top-1/4 sm:max-w-md md:max-w-lg lg:max-w-xl"
        }
      >
        <div className="flex flex-col w-full">
          <form
            onSubmit={(e) => shareImage(e, title)}
            className="grid grid-cols-1 place-items-center bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-4 rounded-2xl"
          >
            <h2 className="text-lg font-bold text-center">Share PhotoBooth</h2>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="title" className="text-lg font-bold">
                Title
              </label>
              <input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="bg-white rounded-sm p-2 w-full"
              />
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 hover:from-green-500 hover:via-emerald-500 hover:to-teal-500 transition duration-300 ease-in-out cursor-pointer"
                >
                  Share
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 hover:from-amber-500 hover:via-orange-500 hover:to-red-500 transition duration-300 ease-in-out cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <div
        className={`relative flex flex-1 justify-center items-center ${backgroundColor} border-10 ${borderColor} p-3.5 rounded-2xl`}
      >
        {capturedImage.length < 3 ? (
          <>
            {isCapturing && timer !== null && (
              <div
                className="absolute inset-0 z-50 grid place-items-center text-3xl bg-black/35 font-bold gap-4 text-white
              opacity-90"
              >
                <div className="text-6xl animate-ping">{timer}</div>
              </div>
            )}

            {!webCamReady && (
              <div className="absolute inset-0 z-50 grid place-items-center text-3xl bg-black font-bold gap-4">
                <BlinkBlur
                  color="#2e9bb5"
                  size="medium"
                  text="Loading Webcam"
                  textColor="white"
                />
              </div>
            )}

            {sticker === "Axlot" && <Axlot />}
            {sticker === "Minecraft" && <Minecraft />}
            {sticker === "Cat" && <Cat />}
            {sticker === "N/A" && <></>}

            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              audio={false}
              videoConstraints={videoConstraints}
              mirrored={true}
              onUserMedia={() => setWebCamReady(true)}
              className={`${invertFilter(filter.invert)} ${brightnessFilter(
                filter.brightness
              )} ${sepiaFilter(filter.sepia)} ${hueRotateFilter(
                filter.hueRotate
              )} ${grayscaleFilter(filter.grayscale)} ${contrastFilter(
                filter.contrast
              )}`}
            />
          </>
        ) : (
          <div className="grid inset-0 place-items-center text-3xl bg-black font-bold gap-4 text-white">
            {messages[Math.floor(Math.random() * messages.length)]}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-4">
        {capturedImage.length !== 3 ? (
          <>
            <button
              className="bg-blue-500 text-lg hover:bg-blue-700 hover:scale-90 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 cursor-pointer transition ease-in-out duration-300"
              onClick={startTimer}
              disabled={timer !== null}
            >
              📸
            </button>
            <button
              className="text-lg text-center bg-red-500 hover:bg-red-600 hover:scale-90 text-white font-bold py-2 px-4 rounded cursor-pointer transition ease-in-out duration-300 disabled:bg-gray-500"
              onClick={resetFilter}
              disabled={isCapturing}
            >
              <img src={resetPic} alt="reset" className="w-7 h-7" />
            </button>
          </>
        ) : (
          <>
            <button
              className="text-lg text-center bg-green-500 hover:bg-green-300 hover:scale-90 text-white font-bold py-2 px-4 rounded cursor-pointer transition ease-in-out duration-300"
              onClick={resetImage}
            >
              Retake
            </button>
            <button
              className="text-lg text-center bg-yellow-500 hover:bg-yellow-300 hover:scale-90 text-white font-bold py-2 px-4 rounded cursor-pointer transition ease-in-out duration-300"
              onClick={handleShare}
            >
              Share
            </button>
            <button
              className="text-lg text-center bg-blue-500 hover:bg-blue-300 hover:scale-90 text-white font-bold py-2 px-4 rounded cursor-pointer transition ease-in-out duration-300"
              onClick={handleDownload}
            >
              Download
            </button>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          </>
        )}
        <button
          className="p-2 text-lg text-white bg-red-500 hover:bg-red-600 hover:scale-95 transition duration-300 ease-in-out rounded cursor-pointer disabled:bg-gray-500"
          disabled={isCapturing}
          onClick={() => GoBack()}
        >
          <img src={backPic} alt="back" className="w-7 h-7" />
        </button>
      </div>
      <span className="text-lg text-center">
        Images Captured: {capturedImage.length}/3
      </span>
    </div>
  );
}
