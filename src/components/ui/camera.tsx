import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoothContext } from "../../lib/context/booth.tsx";
import { messages } from "../../utils/constants/message.ts";
import { BlinkBlur } from "react-loading-indicators";
import Modal from "react-modal";
import Webcam from "react-webcam";
import { UserFilters } from "../../utils/types.ts";
import filters from "../../utils/functions/filters.ts";
import shareImages from "../../utils/functions/share.ts";
import downloadAllImages from "../../utils/functions/download.ts";
import resetPic from "../../assets/ui/reset.png";
import backPic from "../../assets/ui/back.svg";
import Axlot from "../stickers/axlot/cam.tsx";
import Minecraft from "../stickers/minecraft/cam.tsx";
import Cat from "../stickers/cat/cam.tsx";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

export default function Camera({
  photoBoothRef,
}: {
  photoBoothRef: React.RefObject<HTMLDivElement | null>;
}) {
  let userFilters: UserFilters[] = [];
  const name = JSON.parse(localStorage.getItem("name") as string);
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webCamReady, setWebCamReady] = useState(true);
  const [timer, setTimer] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const title = useRef<HTMLInputElement>(null);

  const {
    capturedImage,
    setCapturedImage,
    filter,
    setFilter,
    setPrevFilter,
    filterValues,
    setFilterValues,
    backgroundColor,
    setBackgroundColor,
    backgroundValue,
    setBackgroundValue,
    borderColor,
    setBorderColor,
    borderValue,
    setBorderValue,
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
      "bg-gradient-to-br from-amber-400 via-orange-400 to-red-400",
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

    setFilterValues({
      sepia: 0,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      brightness: 100,
      contrast: 100,
    });
    setFilter({
      sepia: 0,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      brightness: 100,
      contrast: 100,
    });
    setBackgroundColor("");
    setBorderColor("");
    setBorderValue("");
    setBackgroundValue("");
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
    setFilterValues({
      sepia: 0,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      brightness: 100,
      contrast: 100,
    });
    setBorderValue("");
    setBackgroundValue("");
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

      if (title.length === 0) {
        toast.error("Please enter a title");
        return;
      }

      userFilters = Object.values(filterValues).map((f) => String(f));
      console.log(userFilters);
      await shareImages(
        capturedImage as Blob[],
        setCapturedImage,
        setIsModalOpen,
        name,
        title,
        sticker,
        backgroundValue,
        borderValue,
        userFilters,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const videoConstraints = {
    width: window.innerWidth < 1024 ? 320 : 480,
    height: window.innerWidth < 1024 ? 300 : 300,
    facingMode: "user",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Modal
        isOpen={isModalOpen}
        parentSelector={() => document.querySelector("#root") as HTMLElement}
        className={
          "absolute top-1/8 z-50 mx-auto grid w-full max-w-lg place-items-center p-4 sm:inset-x-8 sm:top-1/4 sm:max-w-md md:max-w-lg lg:max-w-xl"
        }
        overlayClassName={
          "fixed inset-0 z-40 bg-black/50 bg-opacity-50 backdrop-blur-sm"
        }
      >
        <div className="flex w-full flex-col">
          <form
            onSubmit={(e) => shareImage(e, title.current?.value as string)}
            className="grid grid-cols-1 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-4"
          >
            <h2 className="text-center text-lg font-bold">Share PhotoBooth</h2>
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="title" className="text-lg font-bold">
                Title
              </label>
              <input
                type="text"
                name="title"
                ref={title}
                className="w-full rounded-sm bg-white p-2"
              />
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 p-2 transition duration-300 ease-in-out hover:from-green-500 hover:via-emerald-500 hover:to-teal-500"
                >
                  Share
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-2 transition duration-300 ease-in-out hover:from-amber-500 hover:via-orange-500 hover:to-red-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <div
        className={`relative flex flex-1 items-center justify-center ${backgroundColor} border-10 ${borderColor} rounded-2xl p-3.5`}
      >
        {capturedImage.length < 3 ? (
          <>
            {isCapturing && timer !== null && (
              <div className="absolute inset-0 z-50 grid place-items-center gap-4 bg-black/35 text-3xl font-bold text-white opacity-90">
                <div className="animate-ping text-6xl">{timer}</div>
              </div>
            )}

            {!webCamReady && (
              <div className="absolute inset-0 z-50 grid place-items-center gap-4 bg-black text-3xl font-bold">
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
                filter.brightness,
              )} ${sepiaFilter(filter.sepia)} ${hueRotateFilter(
                filter.hueRotate,
              )} ${grayscaleFilter(filter.grayscale)} ${contrastFilter(
                filter.contrast,
              )}`}
            />
          </>
        ) : (
          <div className="inset-0 grid h-[200px] w-[calc(100%-2rem)] place-items-center gap-4 bg-black text-center text-3xl font-bold text-white md:h-[300px] md:w-[480px]">
            <div className="p-3">
              {messages[Math.floor(Math.random() * messages.length)]}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {capturedImage.length !== 3 ? (
          <>
            <button
              className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-lg font-bold text-white transition duration-300 ease-in-out hover:scale-90 hover:bg-blue-700 disabled:bg-gray-500"
              onClick={startTimer}
              disabled={timer !== null || !webCamReady}
            >
              📸
            </button>
            <button
              className="cursor-pointer rounded bg-red-500 px-4 py-2 text-center text-lg font-bold text-white transition duration-300 ease-in-out hover:scale-90 hover:bg-red-600 disabled:bg-gray-500"
              onClick={resetFilter}
              disabled={isCapturing || !webCamReady}
            >
              <img src={resetPic} alt="reset" className="h-7 w-7" />
            </button>
          </>
        ) : (
          <>
            <button
              className="cursor-pointer rounded bg-green-500 px-4 py-2 text-center text-lg font-bold text-white transition duration-300 ease-in-out hover:scale-90 hover:bg-green-300"
              onClick={resetImage}
            >
              Retake
            </button>
            <button
              className="cursor-pointer rounded bg-yellow-500 px-4 py-2 text-center text-lg font-bold text-white transition duration-300 ease-in-out hover:scale-90 hover:bg-yellow-300"
              onClick={handleShare}
            >
              Share
            </button>
            <button
              className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-center text-lg font-bold text-white transition duration-300 ease-in-out hover:scale-90 hover:bg-blue-300"
              onClick={handleDownload}
            >
              Download
            </button>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          </>
        )}
        <button
          className="cursor-pointer rounded bg-red-500 p-2 text-center text-lg text-white transition duration-300 ease-in-out hover:scale-95 hover:bg-red-600 disabled:bg-gray-500"
          disabled={isCapturing}
          onClick={() => GoBack()}
        >
          <img src={backPic} alt="back" className="mx-auto h-7 w-7" />
        </button>
      </div>
      <span className="text-center text-lg">
        Images Captured: {capturedImage.length}/3
      </span>
    </div>
  );
}
