import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoothContext } from "../../lib/context/booth.tsx";
import { messages } from "../../utils/constants/message.ts";
import Webcam from "react-webcam";
import filters from "../../utils/functions/filters.ts";
import shareImages from "../../utils/functions/share.ts";
import downloadAllImages from "../../utils/functions/download.ts";
import resetPic from "../../assets/ui/reset.png";
import backPic from "../../assets/ui/back.svg";
import Axlot from "../stickers/axlot-cam.tsx";

export default function Camera({
  photoBoothRef,
}: {
  photoBoothRef: React.RefObject<HTMLDivElement | null>;
}) {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timer, setTimer] = useState<number | null>(null);

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

  const videoConstraints = {
    width: 480,
    height: 300,
    facingMode: "user",
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div
        className={`relative flex flex-1 justify-center items-center ${backgroundColor} border-5 ${borderColor} p-5 rounded-2xl`}
      >
        {capturedImage.length < 3 ? (
          <>
            {isCapturing && timer !== null && (
              <div
                className="absolute inset-0 z-50 grid place-items-center text-3xl bg-black/35 font-bold gap-4 text-white
              opacity-90"
              >
                {timer}
              </div>
            )}

            {sticker === "Axlot" && <Axlot />}
            {sticker === "N/A" && <></>}

            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              audio={false}
              videoConstraints={videoConstraints}
              mirrored={true}
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
          <div className="grid w-[480px] h-[300px] inset-0 place-items-center text-3xl bg-black font-bold gap-4 text-white">
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
              onClick={() =>
                shareImages(capturedImage as Blob[], setCapturedImage)
              }
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
