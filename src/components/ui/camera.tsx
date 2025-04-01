import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import filters from "../../utils/filters.ts";
import { useBoothContext } from "../../context/booth-provider.tsx";
import shareImages from "../../lib/functions/share.ts";
import downloadAllImages from "../../lib/functions/download.ts";

export default function Camera() {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const {
    capturedImage,
    setCapturedImage,
    filter,
    prevFilter,
    setPrevFilter,
    setFilter,
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
  };

  const handleDownload = () => {
    downloadAllImages(
      canvasRef as React.RefObject<HTMLCanvasElement>,
      capturedImage,
      prevFilter
    );
  };

  const GoBack = () => {
    if (capturedImage.length > 0) {
      if (!window.confirm("Are you sure you want to go back?")) return;
    }

    setCapturedImage([]);
    setPrevFilter([]);
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
    setTimer(countdown);
    const interval = setInterval(() => {
      countdown -= 1;
      setTimer(countdown);
      if (countdown === 0) {
        clearInterval(interval);
        setTimer(null);
        capture();
      }
    }, 1000);
  }, [capture]);

  const resetImage = useCallback(() => {
    setCapturedImage([]);
    setPrevFilter([]);
  }, [setCapturedImage]);

  const videoConstraints = {
    width: 480,
    height: 300,
    facingMode: "user",
  };

  return (
    <main className="flex flex-col justify-center items-center gap-4">
      <div className="flex justify-center items-center bg-yellow-300 h-[300px] w-[480px] p-5 rounded-2xl">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          audio={false}
          videoConstraints={videoConstraints}
          className={` ${invertFilter(filter.invert)} ${brightnessFilter(
            filter.brightness
          )} ${sepiaFilter(filter.sepia)} ${hueRotateFilter(
            filter.hueRotate
          )} ${grayscaleFilter(filter.grayscale)} ${contrastFilter(
            filter.contrast
          )}`}
        />
      </div>

      <div className="flex items-center justify-center gap-4">
        {capturedImage.length !== 3 ? (
          <>
            <button
              className="bg-blue-500 text-lg hover:bg-blue-700 hover:scale-90 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 cursor-pointer transition ease-in-out duration-300"
              onClick={startTimer}
              disabled={timer !== null}
            >
              {timer !== null ? `📸 Capturing in ${timer}s` : "📸"}
            </button>
            <button
              className="text-lg text-center bg-red-500 hover:bg-red-600 hover:scale-90 text-white font-bold py-2 px-4 rounded cursor-pointer transition ease-in-out duration-300"
              onClick={resetFilter}
            >
              Reset Filter
            </button>
          </>
        ) : (
          <>
            <button
              className="text-lg text-center bg-green-500 hover:bg-green-300 hover:scale-90 text-white font-bold py-2 px-4 rounded cursor-pointer transition ease-in-out duration-300"
              onClick={resetImage}
            >
              Try Again
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
          className="p-2 text-lg text-white bg-red-500 hover:bg-red-600 hover:scale-95 transition duration-300 ease-in-out rounded cursor-pointer"
          onClick={() => GoBack()}
        >
          Go Back
        </button>
      </div>
      <span className="text-lg text-center">
        Images Captured: {capturedImage.length}/3
      </span>
    </main>
  );
}
