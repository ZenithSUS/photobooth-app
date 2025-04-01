import { filterValues, filtersType } from "../../utils/types";
import { hues } from "../../utils/filter-values";
import { useBoothContext } from "../../context/booth-provider";
import { SelectionColor } from "../../utils/selection-colors";

export default function HueSelection() {
  const { filter, setFilter } = useBoothContext();
  return (
    <div className="flex items-center gap-5">
      <h2 className="text-md font-bold">Hue</h2>
      <div className="flex gap-2">
        {hues.map((level: filterValues, index: number) => (
          <div
            className={`w-8 h-8 rounded-full cursor-pointer ${SelectionColor[index]}`}
            key={level.value}
            style={{
              border: filter.hueRotate === level.value ? "2px solid" : "none",
            }}
            onClick={() =>
              setFilter((prevfilter: filtersType) => ({
                ...prevfilter,
                hueRotate: level.value,
              }))
            }
          ></div>
        ))}
      </div>
    </div>
  );
}
