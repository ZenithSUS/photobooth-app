import { background } from "../../utils/types";
import { useBoothContext } from "../../lib/context/booth";
import { backgrounds } from "../../utils/constants/background";

export default function BackgroundSelection() {
  const { setBackgroundColor, backgroundColor } = useBoothContext();
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="grid grid-cols-5 gap-2">
        {backgrounds.map((bg: background) => (
          <div
            key={bg.value}
            className={`w-8 h-8 rounded-full cursor-pointer ${bg.background}`}
            style={{
              border: bg.background === backgroundColor ? "2px solid" : "none",
            }}
            onClick={() => setBackgroundColor(bg.background as string)}
          ></div>
        ))}
      </div>
    </div>
  );
}
