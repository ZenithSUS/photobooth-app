import Camera from "../components/ui/camera";
import Filters from "../components/filters/filters";
import Backgrounds from "../components/backgrounds/backgound";
import { useBoothContext } from "../lib/context/booth";
import { useRef } from "react";

export default function PhotoBooth() {
  const { capturedImage, prevFilter, backgroundColor, borderColor } =
    useBoothContext();
  const photoBoothRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-4">Photo Booth</h1>
      <main className="flex flex-col-reverse items-center md:items-start md:grid md:grid-cols-[500px_1fr] md:gap-2">
        <div className="flex flex-col gap-2 p-4 items-center">
          <h2 className="text-2xl font-bold text-center">Captured Image</h2>

          {capturedImage.length > 0 ? (
            <div
              className={`flex flex-col gap-0.5 p-2 items-center justify-center ${backgroundColor} border-5 ${borderColor}`}
              ref={photoBoothRef}
            >
              {capturedImage.map((image, index) => {
                const imageUrl = URL.createObjectURL(image as Blob);
                return (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Captured Image ${index}`}
                    height={"300px"}
                    width={"300px"}
                    className={`p-0.5 grayscale-${prevFilter[index].grayscale} sepia-${prevFilter[index].sepia} hue-rotate-${prevFilter[index].hueRotate} invert-${prevFilter[index].invert} brightness-${prevFilter[index].brightness} contrast-${prevFilter[index].contrast}`}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-lg text-center">No images captured yet.</p>
          )}
        </div>

        <div className="flex flex-col items-center md:flex-row md:items-start gap-2.5">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-3xl">Take a selfie</h1>
            <Camera photoBoothRef={photoBoothRef} />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-center">
              Photo Booth Customization
            </h1>
            <Filters />
            <Backgrounds />
          </div>
        </div>
      </main>
    </>
  );
}
