import { useBoothContext } from "../context/booth-provider";
import { sepias } from "../utils/filter-values.ts";
import { filtersType, filterValues } from "../utils/types";
import { SelectionColor } from "../utils/selection-colors.ts";

export default function SepiaSelection() {
  const { filter, setFilter } = useBoothContext();
  return (
    <div className="flex items-center gap-5">
      <h2 className="text-md font-bold">Sepia</h2>
      <div className="flex gap-2">
        {sepias.map((level: filterValues, index: number) => (
          <div
            key={level.value}
            className={`w-8 h-8 rounded-full cursor-pointer ${SelectionColor[index]}`}
            style={{
              border: filter.sepia === level.value ? "2px solid" : "none",
            }}
            onClick={() =>
              setFilter((prevFilter: filtersType) => ({
                ...prevFilter,
                sepia: level.value,
              }))
            }
          ></div>
        ))}
      </div>
    </div>
  );
}
