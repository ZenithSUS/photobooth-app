import { useState } from "react";
import BackgroundSelection from "./background-selection";
import BorderSelection from "./border-selection";

export default function Backgrounds() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  return (
    <main className="flex flex-col gap-2 justify-center">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 hover:scale-105 hover:bg-gradient-to-br hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white px-4 py-2 rounded cursor-pointer transition-all duration-300 ease-in-out"
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
        className="bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 hover:scale-105 hover:bg-gradient-to-br hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white px-4 py-2 rounded cursor-pointer transition-all duration-300 ease-in-out"
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
