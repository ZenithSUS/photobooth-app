import Camera from "../components/ui/camera";
import Customization from "../components/ui/customization";
import { useBoothContext } from "../lib/context/booth";
import { useRef } from "react";
import AxlotStickers from "../components/stickers/axlot/img";
import MinecraftStickers from "../components/stickers/minecraft/img";

export default function PhotoBooth() {
  const { capturedImage, prevFilter, backgroundColor, borderColor, sticker } =
    useBoothContext();
  const photoBoothRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-4">Photo Booth</h1>
      <div className="place-self-center mx-4">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-2 items-center self-center">
            <h1 className="text-3xl">Take a selfie</h1>
            <Camera photoBoothRef={photoBoothRef} />
          </div>

          <div className="self-center">
            <h1 className="text-2xl font-bold text-center">
              Photo Booth Customization
            </h1>
            <Customization />
          </div>
        </div>

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
                  <div className="relative p-0.5" key={index}>
                    {sticker === "N/A" && <></>}
                    {sticker === "Axlot" && (
                      <AxlotStickers set={(index + 1) as number} />
                    )}
                    {sticker === "Minecraft" && (
                      <MinecraftStickers set={(index + 1) as number} />
                    )}
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Captured Image ${index}`}
                      height={"300px"}
                      width={"300px"}
                      className={`p-0.5 grayscale-${prevFilter[index].grayscale} sepia-${prevFilter[index].sepia} hue-rotate-${prevFilter[index].hueRotate} invert-${prevFilter[index].invert} brightness-${prevFilter[index].brightness} contrast-${prevFilter[index].contrast}`}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-lg text-center">No images captured yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
