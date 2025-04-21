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
    <div className="flex flex-col justify-center gap-2">
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
        className="bg-button-secondary-bg-dark text-button-secondary-text hover:bg-button-secondary-hover-bg-darker cursor-pointer rounded px-4 py-2 transition-all duration-300 ease-in-out hover:scale-105 disabled:bg-gray-400 hover:disabled:cursor-not-allowed"
      >
        Filters
      </button>

      <div
        className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${
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
        className="bg-button-secondary-bg-dark text-button-secondary-text hover:bg-button-secondary-hover-bg-darker cursor-pointer rounded px-4 py-2 transition-all duration-300 ease-in-out hover:scale-105 disabled:bg-gray-400 hover:disabled:cursor-not-allowed"
      >
        Backgrounds
      </button>

      <div
        className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${
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
        className="bg-button-secondary-bg-dark text-button-secondary-text hover:bg-button-secondary-hover-bg-darker cursor-pointer rounded px-4 py-2 transition-all duration-300 ease-in-out hover:scale-105 disabled:bg-gray-400 hover:disabled:cursor-not-allowed"
      >
        Borders
      </button>

      <div
        className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${
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
        className="bg-button-secondary-bg-dark text-button-secondary-text hover:bg-button-secondary-hover-bg-darker cursor-pointer rounded px-4 py-2 transition-all duration-300 ease-in-out hover:scale-105 disabled:bg-gray-400 hover:disabled:cursor-not-allowed"
      >
        Stickers
      </button>

      <div
        className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${
          isDropdownOpen.dropdown4 ? "max-h-screen" : "max-h-0"
        }`}
      >
        <StickerSelection />
      </div>
    </div>
  );
}
