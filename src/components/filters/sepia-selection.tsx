import { useBoothContext } from "../../lib/context/booth.tsx";
import { sepias } from "../../utils/constants/filter-values.ts";
import { FiltersType, FilterValues } from "../../utils/types.ts";
import { SelectionColor } from "../../utils/constants/selection-colors.ts";

export default function SepiaSelection() {
  const { filter, setFilter, setFilterValues } = useBoothContext();

  const handleSepiaChange = (value: FilterValues) => {
    setFilter((prevFilter: FiltersType) => ({
      ...prevFilter,
      sepia: value.value,
    }));
    setFilterValues((prevFilterValues: FiltersType) => ({
      ...prevFilterValues,
      sepia: value.style,
    }));
  };
  return (
    <div className="flex items-center gap-5">
      <h2 className="text-md font-bold">Sepia</h2>
      <div className="flex gap-2">
        {sepias.map((level: FilterValues, index: number) => (
          <div
            key={level.value}
            className={`h-8 w-8 cursor-pointer rounded-full ${SelectionColor[index]}`}
            style={{
              border: filter.sepia === level.value ? "2px solid" : "none",
            }}
            onClick={() => handleSepiaChange(level)}
          ></div>
        ))}
      </div>
    </div>
  );
}
