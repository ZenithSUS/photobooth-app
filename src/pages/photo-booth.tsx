import Camera from "../components/camera";
import Wrapper from "../components/wrapper";
import { useBoothContext } from "../context/booth-provider";

export default function PhotoBooth() {
  const { capturedImage } = useBoothContext();

  return (
    <Wrapper>
      <main className="flex gap-4 w-full">
        <div className="flex flex-col items-center">
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
                />
              ))}
            </div>
          ) : (
            <p className="text-lg text-center">No images captured yet.</p>
          )}
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="text-3xl">Take a selfie</h1>
          <Camera />
        </div>
      </main>
    </Wrapper>
  );
}
