import { useBoothContext } from "../../lib/context/booth.tsx";
import { grayscales } from "../../utils/constants/filter-values.ts";
import { filtersType, filterValues } from "../../utils/types.ts";
import { SelectionColor } from "../../utils/constants/selection-colors.ts";

export default function GrayscaleSelection() {
  const { filter, setFilter } = useBoothContext();
  return (
    <div className="flex items-center gap-5">
      <h2 className="text-md font-bold">Grayscale</h2>
      <div className="flex gap-2">
        {grayscales.map((level: filterValues, index: number) => (
          <div
            key={level.value}
            className={`h-8 w-8 cursor-pointer rounded-full ${SelectionColor[index]}`}
            style={{
              border: filter.grayscale === level.value ? "2px solid" : "none",
            }}
            onClick={() =>
              setFilter((prevFilter: filtersType) => ({
                ...prevFilter,
                grayscale: level.value,
              }))
            }
          ></div>
        ))}
      </div>
    </div>
  );
}
