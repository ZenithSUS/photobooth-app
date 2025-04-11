import { FilterValues, FiltersType } from "../../utils/types";
import { hues } from "../../utils/constants/filter-values";
import { useBoothContext } from "../../lib/context/booth";
import { SelectionColor } from "../../utils/constants/selection-colors";

export default function HueSelection() {
  const { filter, setFilter } = useBoothContext();
  return (
    <div className="flex items-center gap-5">
      <h2 className="text-md font-bold">Hue</h2>
      <div className="flex gap-2">
        {hues.map((level: FilterValues, index: number) => (
          <div
            className={`h-8 w-8 cursor-pointer rounded-full ${SelectionColor[index]}`}
            key={level.value}
            style={{
              border: filter.hueRotate === level.value ? "2px solid" : "none",
            }}
            onClick={() =>
              setFilter((prevfilter: FiltersType) => ({
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
