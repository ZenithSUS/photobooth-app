import Camera from "../components/camera";
import Wrapper from "../components/wrapper";
import Filters from "../components/filters";
import { useBoothContext } from "../context/booth-provider";

export default function PhotoBooth() {
  const { capturedImage, prevFilter } = useBoothContext();

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
            </div>
          ) : (
            <p className="text-lg text-center">No images captured yet.</p>
          )}
        </div>

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
