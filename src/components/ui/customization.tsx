import { useState, useEffect } from "react";
import InvertSelection from "../filters/invert-selection";
import SepiaSelection from "../filters/sepia-selection";
import BrightnessSelection from "../filters/brightness-selection";
import GrayscaleSelection from "../filters/grayscale-selection";
import ContrastSelection from "../filters/contrast-selection";
import HueSelection from "../filters/hue-selection";
import BackgroundSelection from "../backgrounds/background-selection";
import BorderSelection from "../backgrounds/border-selection";
import StickerSelection from "../stickers/sticker-selection";
import { useBoothContext } from "../../lib/context/booth";

export default function Customization() {
  type DropdownState = {
    dropdown1: boolean;
    dropdown2: boolean;
    dropdown3: boolean;
    dropdown4: boolean;
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState<DropdownState>({
    dropdown1: false,
    dropdown2: false,
    dropdown3: false,
    dropdown4: false,
  });

  const { isCapturing, capturedImage } = useBoothContext();

  useEffect(() => {
    if (capturedImage.length > 0 || isCapturing) {
      setIsDropdownOpen((prev) => ({
        ...prev,
        dropdown1: false,
        dropdown2: false,
        dropdown3: false,
        dropdown4: false,
      }));
    }
  }, [capturedImage, isCapturing]);

  return (
    <div className="flex flex-col gap-2 justify-center">
      <button
        onClick={() =>
          setIsDropdownOpen({
            dropdown1: !isDropdownOpen.dropdown1,
            dropdown2: false,
            dropdown3: false,
            dropdown4: false,
          })
        }
        disabled={isCapturing || capturedImage.length > 0}
        className="bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 hover:scale-105 hover:bg-gradient-to-br hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white px-4 py-2 rounded cursor-pointer transition-all duration-300 ease-in-out
        disabled:cursor-not-allowed disabled:bg-gradient-to-br disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400"
      >
        Filters
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden flex flex-col gap-3 ${
          isDropdownOpen.dropdown1 ? "max-h-screen" : "max-h-0"
        }`}
      >
        <InvertSelection />
        <SepiaSelection />
        <BrightnessSelection />
        <GrayscaleSelection />
        <ContrastSelection />
        <HueSelection />
      </div>

      <button
        onClick={() =>
          setIsDropdownOpen({
            dropdown1: false,
            dropdown2: !isDropdownOpen.dropdown2,
            dropdown3: false,
            dropdown4: false,
          })
        }
        disabled={isCapturing || capturedImage.length > 0}
        className="bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 hover:scale-105 hover:bg-gradient-to-br hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white px-4 py-2 rounded cursor-pointer transition-all duration-300 ease-in-out
        disabled:cursor-not-allowed disabled:bg-gradient-to-br disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400"
      >
        Backgrounds
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden flex flex-col gap-3 ${
          isDropdownOpen.dropdown2 ? "max-h-screen" : "max-h-0"
        }`}
      >
        <BackgroundSelection />
      </div>

      <button
        onClick={() =>
          setIsDropdownOpen({
            dropdown1: false,
            dropdown2: false,
            dropdown3: !isDropdownOpen.dropdown3,
            dropdown4: false,
          })
        }
        disabled={isCapturing || capturedImage.length > 0}
        className="bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 hover:scale-105 hover:bg-gradient-to-br hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white px-4 py-2 rounded cursor-pointer transition-all duration-300 ease-in-out
        disabled:cursor-not-allowed disabled:bg-gradient-to-br disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400"
      >
        Borders
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden flex flex-col gap-3 ${
          isDropdownOpen.dropdown3 ? "max-h-screen" : "max-h-0"
        }`}
      >
        <BorderSelection />
      </div>

      <button
        onClick={() =>
          setIsDropdownOpen({
            dropdown1: false,
            dropdown2: false,
            dropdown3: false,
            dropdown4: !isDropdownOpen.dropdown4,
          })
        }
        disabled={isCapturing || capturedImage.length > 0}
        className="bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 hover:scale-105 hover:bg-gradient-to-br hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white px-4 py-2 rounded cursor-pointer transition-all duration-300 ease-in-out
        disabled:cursor-not-allowed disabled:bg-gradient-to-br disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400"
      >
        Stickers
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden flex flex-col gap-3 ${
          isDropdownOpen.dropdown4 ? "max-h-screen" : "max-h-0"
        }`}
      >
        <StickerSelection />
      </div>
    </div>
  );
}
