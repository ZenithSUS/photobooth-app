import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import filters from "../utils/filters";
import { useBoothContext } from "../context/booth-provider";

export default function Camera() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { capturedImage, setCapturedImage, filter, prevFilter, setPrevFilter } =
    useBoothContext();
  const {
    sepiaFilter,
    grayscaleFilter,
    hueRotateFilter,
    invertFilter,
    brightnessFilter,
    contrastFilter,
  } = filters;

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPrevFilter((prev) => [...prev, { ...filter }]);
      setCapturedImage((prev) => [...prev, imageSrc]);
    } else {
      console.error("Failed to capture image. Ensure webcam is active.");
    }
  }, [webcamRef, filter, setPrevFilter, setCapturedImage]);

  const resetImage = useCallback(() => {
    setCapturedImage([]);
    setPrevFilter([]);
  }, [setCapturedImage]);

  const videoConstraints = {
    width: 480,
    height: 300,
    facingMode: "user",
  };

  const downloadAllImages = () => {
    if (canvasRef.current && capturedImage.length === 3) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = 900;
        canvas.height = 300;
        capturedImage.forEach((image, index) => {
          const img = new Image();
          img.src = image as string;

          img.onload = () => {
            const filter = prevFilter[index];
            ctx.filter = `
              grayscale(${filter.grayscale}%)
              sepia(${filter.sepia}%)
              hue-rotate(${filter.hueRotate}deg)
              invert(${filter.invert}%)
              brightness(${filter.brightness}%)
              contrast(${filter.contrast}%)
            `;
            ctx.drawImage(img, index * 300, 0, 300, 300);

            if (index === capturedImage.length - 1) {
              const link = document.createElement("a");
              link.download = "photobooth.png";
              link.href = canvas.toDataURL();
              link.click();
            }
          };
        });
      }
    }
  };

  return (
    <main className="flex flex-col justify-center items-center gap-4">
      <div className="flex justify-center items-center bg-yellow-300 h-[300px] w-[480px] p-5 rounded-2xl">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          audio={false}
          videoConstraints={videoConstraints}
          className={`${brightnessFilter(filter.brightness)} ${sepiaFilter(
            filter.sepia
          )} ${grayscaleFilter(filter.grayscale)} ${hueRotateFilter(
            filter.hueRotate
          )} ${invertFilter(filter.invert)} ${contrastFilter(filter.contrast)}`}
        />
      </div>

      {capturedImage.length !== 3 ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 hover:scale-90 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 cursor-pointer transition ease-in-out duration-300"
          onClick={capture}
        >
          Capture
        </button>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <button
            className="text-lg text-center bg-green-500 hover:bg-green-300 hover:scale-90 text-white font-bold py-2 px-4 rounded cursor-pointer transition ease-in-out duration-300"
            onClick={resetImage}
          >
            Try Again
          </button>
          <button
            className="text-lg text-center bg-blue-500 hover:bg-blue-300 hover:scale-90 text-white font-bold py-2 px-4 rounded cursor-pointer transition ease-in-out duration-300"
            onClick={downloadAllImages}
          >
            Download
          </button>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>
      )}
      <span className="text-lg text-center">
        Images Captured: {capturedImage.length}/3
      </span>
    </main>
  );
}
