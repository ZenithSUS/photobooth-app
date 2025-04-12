import { useBoothContext } from "../../lib/context/booth.tsx";
import { grayscales } from "../../utils/constants/filter-values.ts";
import { FiltersType, FilterValues } from "../../utils/types.ts";
import { SelectionColor } from "../../utils/constants/selection-colors.ts";

export default function GrayscaleSelection() {
  const { filter, setFilter, setFilterValues } = useBoothContext();

  const handleGrayscaleChange = (value: FilterValues) => {
    setFilter((prevFilter: FiltersType) => ({
      ...prevFilter,
      grayscale: value.value,
    }));

    setFilterValues((prevFilterValues: FiltersType) => ({
      ...prevFilterValues,
      grayscale: value.style,
    }));
  };

  return (
    <div className="flex items-center gap-5">
      <h2 className="text-md font-bold">Grayscale</h2>
      <div className="flex gap-2">
        {grayscales.map((level: FilterValues, index: number) => (
          <div
            key={level.value}
            className={`h-8 w-8 cursor-pointer rounded-full ${SelectionColor[index]}`}
            style={{
              border: filter.grayscale === level.value ? "2px solid" : "none",
            }}
            onClick={() => handleGrayscaleChange(level)}
          ></div>
        ))}
      </div>
    </div>
  );
}
