import { useState, useEffect } from "react";
import BackgroundSelection from "./background-selection";
import BorderSelection from "./border-selection";
import { useBoothContext } from "../../lib/context/booth";

export default function Backgrounds() {
  const { isCapturing, capturedImage } = useBoothContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  useEffect(() => {
    if (capturedImage.length > 0 || isCapturing) {
      setIsDropdownOpen(false);
      setIsDropdownOpen2(false);
    }
  }, [capturedImage, isCapturing]);

  return (
    <main className="flex flex-col gap-2 justify-center">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        disabled={isCapturing || capturedImage.length > 0}
        className="bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 hover:scale-105 hover:bg-gradient-to-br hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white px-4 py-2 rounded cursor-pointer transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-gradient-to-br disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400"
      >
        Backgrounds
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden flex flex-col gap-3 ${
          isDropdownOpen ? "max-h-screen" : "max-h-0"
        }
        `}
      >
        <BackgroundSelection />
      </div>

      <button
        onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
        className="bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 hover:scale-105 hover:bg-gradient-to-br hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white px-4 py-2 rounded cursor-pointer transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-gradient-to-br disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400"
        disabled={isCapturing || capturedImage.length > 0}
      >
        Borders
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden flex flex-col gap-3 ${
          isDropdownOpen2 ? "max-h-screen" : "max-h-0"
        }
        `}
      >
        <BorderSelection />
      </div>
    </main>
  );
}
