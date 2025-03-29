import { useRef } from "react";
import Camera from "../components/camera";
import Wrapper from "../components/wrapper";
import Filters from "../components/filters";
import { useBoothContext } from "../context/booth-provider";

export default function PhotoBooth() {
  const { capturedImage, prevFilter } = useBoothContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
              link.download = "captured-images.png";
              link.href = canvas.toDataURL();
              link.click();
            }
          };
        });
      }
    }
  };

  return (
    <Wrapper>
      <main className="grid grid-cols-[35%_65%] items-start gap-4 w-full p-4">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-2xl font-bold text-center">Captured Image</h2>
          {capturedImage.length > 0 ? (
            <div className="flex flex-col gap-0.5 bg-amber-400 p-2">
              {capturedImage.map((image, index) => (
                <img
                  key={index}
                  src={image as string}
                  alt={`Captured Image ${index}`}
                  height={"300px"}
                  width={"300px"}
                  className={`p-2 grayscale-${prevFilter[index].grayscale} sepia-${prevFilter[index].sepia} hueRotate-${prevFilter[index].hueRotate} invert-${prevFilter[index].invert} brightness-${prevFilter[index].brightness} contrast-${prevFilter[index].contrast}
                  `}
                />
              ))}
              {capturedImage.length === 3 && (
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={downloadAllImages}
                >
                  Download All
                </button>
              )}
            </div>
          ) : (
            <p className="text-lg text-center">No images captured yet.</p>
          )}
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        <div className="flex items-start justify-between mx-auto gap-4">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-3xl">Take a selfie</h1>
            <Camera />
          </div>
          <Filters />
        </div>
      </main>
    </Wrapper>
  );
}
