import { border } from "../../utils/types";
import { useBoothContext } from "../../lib/context/booth";
import { borders } from "../../utils/constants/border";

export default function BorderSelection() {
  const { borderColor, setBorderColor } = useBoothContext();

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="grid grid-cols-5 gap-2">
        {borders.map((border: border) => (
          <div
            key={border.value}
            className={`w-8 h-8 rounded-full cursor-pointer ${border.background}`}
            style={{
              border: border.border === borderColor ? "2px solid" : "none",
            }}
            onClick={() => setBorderColor(border.border as string)}
          ></div>
        ))}
      </div>
    </div>
  );
}
