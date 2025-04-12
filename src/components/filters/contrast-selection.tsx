import { useBoothContext } from "../../lib/context/booth";
import { contrasts } from "../../utils/constants/filter-values.ts";
import { FiltersType, FilterValues } from "../../utils/types";
import { SelectionColor } from "../../utils/constants/selection-colors.ts";

export default function ContrastSelection() {
  const { filter, setFilter, setFilterValues } = useBoothContext();

  const handleContrastChange = (value: FilterValues) => {
    setFilter((prevFilter: FiltersType) => ({
      ...prevFilter,
      contrast: value.value,
    }));

    setFilterValues((prevFilterValues: FiltersType) => ({
      ...prevFilterValues,
      contrast: value.style,
    }));
  };
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
            onClick={() => handleContrastChange(level)}
          ></div>
        ))}
      </div>
    </div>
  );
}
