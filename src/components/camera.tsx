import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { useBoothContext } from "../context/booth-provider";

export default function Camera() {
  const webcamRef = useRef<Webcam>(null);
  const { capturedImage, setCapturedImage } = useBoothContext();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage((prevImage) => [...prevImage, imageSrc]);
    } else {
      console.error("Failed to capture image. Ensure webcam is active.");
    }
  }, [webcamRef]);

  const videoConstraints = {
    width: 480,
    height: 270,
    facingMode: "user",
  };

  return (
    <main className="flex flex-col items-center gap-4">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        audio={false}
        videoConstraints={videoConstraints}
        className=""
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500"
        onClick={capture}
        disabled={capturedImage.length === 3}
      >
        {capturedImage.length === 3 ? "Done" : "Capture"}
      </button>
    </main>
  );
}
