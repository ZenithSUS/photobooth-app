import { useState, useEffect } from "react";
import GrayscaleSelection from "./grayscale-selections";
import SepiaSelection from "./sepia-selection";
import BrightnessSelection from "./brightness-selection";
import ContrastSelection from "./contrast-selection";
import InvertSelection from "./invert-selection";
import HueSelection from "./hue-selection";
import { useBoothContext } from "../../lib/context/booth";

export default function Filters() {
  const { isCapturing, capturedImage } = useBoothContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (capturedImage.length > 0 || isCapturing) {
      setIsDropdownOpen(false);
    }
  }, [capturedImage, isCapturing]);

  return (
    <div className="flex flex-col gap-2 justify-center">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 hover:scale-105 hover:bg-gradient-to-br hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white px-4 py-2 rounded cursor-pointer transition-all duration-300 ease-in-out
        disabled:cursor-not-allowed disabled:bg-gradient-to-br disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400"
        disabled={isCapturing || capturedImage.length > 0}
      >
        Filters
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden flex flex-col gap-3 ${
          isDropdownOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <InvertSelection />
        <SepiaSelection />
        <BrightnessSelection />
        <GrayscaleSelection />
        <ContrastSelection />
        <HueSelection />
      </div>
    </div>
  );
}
