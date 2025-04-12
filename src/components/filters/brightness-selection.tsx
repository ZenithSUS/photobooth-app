import { useBoothContext } from "../../lib/context/booth.tsx";
import { brightnesses } from "../../utils/constants/filter-values.ts";
import { FiltersType, FilterValues } from "../../utils/types";
import { SelectionColor } from "../../utils/constants/selection-colors.ts";

export default function BrightnessSelection() {
  const { filter, setFilter, setFilterValues } = useBoothContext();

  const handleBrightnessChange = (value: FilterValues) => {
    setFilter((prevFilter: FiltersType) => ({
      ...prevFilter,
      brightness: value.value,
    }));

    setFilterValues((prevFilterValues: FiltersType) => ({
      ...prevFilterValues,
      brightness: value.style,
    }));
  };

  return (
    <div className="flex items-center gap-5">
      <h2 className="text-md font-bold">Brightness</h2>
      <div className="flex gap-2">
        {brightnesses.map((level: FilterValues, index: number) => (
          <div
            key={level.value}
            className={`h-8 w-8 cursor-pointer rounded-full ${SelectionColor[index]}`}
            style={{
              border: filter.brightness === level.value ? "2px solid" : "none",
            }}
            onClick={() => handleBrightnessChange(level)}
          ></div>
        ))}
      </div>
    </div>
  );
}
