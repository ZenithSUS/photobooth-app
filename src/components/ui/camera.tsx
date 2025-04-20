import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoothContext } from "../../lib/context/booth.tsx";
import { messages } from "../../utils/constants/message.ts";
import { BlinkBlur } from "react-loading-indicators";
import { toast } from "react-toastify";
import { ShareModal } from "./modals.tsx";
import Webcam from "react-webcam";
import filters from "../../utils/functions/filters.ts";
import downloadAllImages from "../../utils/functions/download.ts";
import resetPic from "../../assets/ui/reset.png";
import backPic from "../../assets/ui/back.svg";
import getCurrentSticker from "./cam-sticker.tsx";
import { FiltersType } from "../../utils/types.ts";

export default function Camera({
  photoBoothRef,
}: {
  photoBoothRef: React.RefObject<HTMLDivElement | null>;
}) {
  let user = JSON.parse(localStorage.getItem("session") || "false") as boolean;
  const name = JSON.parse(localStorage.getItem("name") as string);
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [webCamReady, setWebCamReady] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setCapturedImage([]);
    setFilter({
      sepia: 0,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      brightness: 100,
      contrast: 100,
    });
    setFilterValues({
      sepia: "sepia-0",
      grayscale: "grayscale-0",
      hueRotate: "hue-rotate-0",
      invert: "invert-0",
      brightness: "brightness-100",
      contrast: "contrast-100",
    });
    setPrevFilter([]);
    setSticker("N/A");
    setBackgroundColor(
      "bg-gradient-to-br from-amber-400 via-orange-400 to-red-400",
    );
    setBackgroundValue("1");
    setBorderColor("border-sky-400");
    setBorderValue("0");
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
    resetFilter();

    navigate("/dashboard");
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
    resetFilter();
  }, [setCapturedImage]);

  const handleShare = async () => {
    try {
      const guestMode = !user;
      if (guestMode) {
        toast.warn("You must be logged in to share images");
        return navigate("/login");
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <ShareModal
        isModalOpen={isModalOpen}
        setIsModalOpen={() => setIsModalOpen(false)}
        shareData={{
          capturedImage: capturedImage as Blob[],
          setCapturedImage: setCapturedImage as React.Dispatch<
            React.SetStateAction<Blob[]>
          >,
          setFilterValues: setFilterValues as React.Dispatch<
            React.SetStateAction<FiltersType>
          >,
          setPrevFilter: setPrevFilter as React.Dispatch<
            React.SetStateAction<FiltersType[]>
          >,
          setSticker: setSticker as React.Dispatch<
            React.SetStateAction<string>
          >,
          setFilter: setFilter as React.Dispatch<
            React.SetStateAction<FiltersType>
          >,
          setBorderValue: setBorderValue as React.Dispatch<
            React.SetStateAction<string>
          >,
          setBackgroundValue: setBackgroundValue as React.Dispatch<
            React.SetStateAction<string>
          >,
          setBorderColor: setBorderColor as React.Dispatch<
            React.SetStateAction<string>
          >,
          setBackgroundColor: setBackgroundColor as React.Dispatch<
            React.SetStateAction<string>
          >,
          sticker,
          name,
          borderValue,
          backgroundValue,
          filterValues,
        }}
      />
      <div
        className={`relative flex flex-1 items-center justify-center ${backgroundColor} border-10 ${borderColor} rounded-2xl p-3.5`}
      >
        {capturedImage.length < 3 ? (
          <>
            {isCapturing && timer !== null && (
              <div className="absolute inset-0 z-50 grid place-items-center gap-4 bg-black/35 text-3xl font-bold text-white opacity-90">
                <div className="photobooth-text-italic animate-ping text-6xl">
                  {timer}
                </div>
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

            {getCurrentSticker({
              sticker: sticker,
              set: capturedImage.length + 1,
              type: "Cam",
            })}

            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              audio={false}
              width={500}
              mirrored={true}
              onUserMedia={() => setWebCamReady(true)}
              onUserMediaError={() => setWebCamReady(false)}
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
          <div className="inset-0 grid h-[200px] w-[calc(100%-2rem)] place-items-center gap-4 bg-black p-5 text-center text-3xl font-bold text-white md:h-[300px] md:w-[480px]">
            <div className="photobooth-text-italic p-3">
              {messages[Math.floor(Math.random() * messages.length)]}
            </div>
          </div>
        )}
      </div>

      <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4`}>
        {capturedImage.length !== 3 ? (
          <>
            <button
              className="flex cursor-pointer items-center rounded bg-sky-500 px-4 py-2 text-center text-lg font-bold text-white transition duration-300 ease-in-out hover:scale-90 hover:bg-sky-300 disabled:bg-gray-500"
              onClick={resetFilter}
              disabled={isCapturing || !webCamReady}
            >
              <img src={resetPic} alt="reset" className="h-7 w-7" />
            </button>
            <button
              className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-lg font-bold text-white transition duration-300 ease-in-out hover:scale-90 hover:bg-blue-700 disabled:bg-gray-500 lg:col-span-2"
              onClick={startTimer}
              disabled={timer !== null || !webCamReady}
            >
              <p className="text-3xl">📸</p>
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
          className={`${capturedImage.length === 3 ? "col-span-1" : "col-span-2"} cursor-pointer rounded bg-red-500 p-2 text-center text-lg text-white transition duration-300 ease-in-out hover:scale-95 hover:bg-red-600 disabled:bg-gray-500 md:col-span-1`}
          disabled={isCapturing || !user}
          onClick={() => GoBack()}
        >
          <img src={backPic} alt="back" className="mx-auto h-7 w-7" />
        </button>
      </div>
      <span className="text-center text-lg font-semibold">
        Images Captured: {capturedImage.length} of 3
      </span>
    </div>
  );
}
