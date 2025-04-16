import Camera from "../../components/ui/camera";
import { useBoothContext } from "../../lib/context/booth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Customization from "../../components/ui/customization";
import AxlotStickers from "../../components/stickers/axlot/img";
import MinecraftStickers from "../../components/stickers/minecraft/img";
import CatStickers from "../../components/stickers/cat/img";
import BearStickers from "../../components/stickers/bear/img";
import GamerStickers from "../../components/stickers/gamer/img";
import DemonSlayer from "../../components/stickers/demon-slayer/img";

export default function PhotoBooth() {
  const navigate = useNavigate();
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

  return (
    <>
      <div className="flex flex-col place-items-center gap-1.5 md:grid md:grid-cols-3">
        <div className="hidden md:block"></div>

        <h1 className="text-center text-3xl font-bold">ZenithBooth</h1>

        <div className="m-2 flex flex-col items-center justify-center gap-2 md:flex-row md:justify-end">
          <h1 className="text-2xl">
            {name !== null || "" ? name : "Guest User"}
          </h1>
          {name === null && (
            <button
              className="cursor-pointer rounded-md bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-1 text-lg transition duration-300 ease-in-out hover:scale-95 hover:from-blue-500 hover:via-blue-500 hover:to-indigo-500"
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
            <h1 className="text-3xl">Take a selfie</h1>
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
                      {sticker === "N/A" && <></>}
                      {sticker === "Axlot" && (
                        <AxlotStickers
                          set={(index + 1) as number}
                          type={"Image"}
                        />
                      )}
                      {sticker === "Minecraft" && (
                        <MinecraftStickers
                          set={(index + 1) as number}
                          type={"Image"}
                        />
                      )}
                      {sticker === "Cat" && (
                        <CatStickers
                          set={(index + 1) as number}
                          type={"Image"}
                        />
                      )}
                      {sticker === "Bear" && (
                        <BearStickers
                          set={(index + 1) as number}
                          type={"Image"}
                        />
                      )}
                      {sticker === "Gamer" && (
                        <GamerStickers
                          set={(index + 1) as number}
                          type={"Image"}
                        />
                      )}
                      {sticker === "DemonSlayer" && (
                        <DemonSlayer
                          set={(index + 1) as number}
                          type={"Image"}
                        />
                      )}
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
