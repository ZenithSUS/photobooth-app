import { useBoothContext } from "../../lib/context/booth";
import { contrasts } from "../../utils/constants/filter-values.ts";
import { FiltersType, FilterValues } from "../../utils/types";
import { SelectionColor } from "../../utils/constants/selection-colors.ts";

export default function ContrastSelection() {
  const { filter, setFilter } = useBoothContext();
  return (
    <div className="flex items-center gap-5">
      <h2 className="text-md font-bold">Contrast</h2>
      <div className="flex gap-2">
        {contrasts.map((level: FilterValues, index: number) => (
          <div
            key={level.value}
            className={`h-8 w-8 cursor-pointer rounded-full ${SelectionColor[index]}`}
            style={{
              border: filter.contrast === level.value ? "2px solid" : "none",
            }}
            onClick={() =>
              setFilter((prevFilter: FiltersType) => ({
                ...prevFilter,
                contrast: level.value,
              }))
            }
          ></div>
        ))}
      </div>
    </div>
  );
}
