import { Background } from "../../utils/types";
import { useBoothContext } from "../../lib/context/booth";
import { backgrounds } from "../../utils/constants/background";

export default function BackgroundSelection() {
  const { setBackgroundColor, backgroundColor, setBackgroundValue } =
    useBoothContext();

  const handleBackgroundChange = (bg: Background) => {
    setBackgroundValue(String(bg.value));
    setBackgroundColor(bg.background as string);
  };
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="grid grid-cols-5 gap-2">
        {backgrounds.map((bg: Background) => (
          <div
            key={bg.value}
            className={`h-8 w-8 cursor-pointer rounded-full ${bg.background}`}
            style={{
              border: bg.background === backgroundColor ? "2px solid" : "none",
            }}
            onClick={() => handleBackgroundChange(bg)}
          ></div>
        ))}
      </div>
    </div>
  );
}
