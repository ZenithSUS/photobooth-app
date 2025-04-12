import { useBoothContext } from "../../lib/context/booth.tsx";
import { FiltersType, FilterValues } from "../../utils/types.ts";
import { inverts } from "../../utils/constants/filter-values.ts";
import { SelectionColor } from "../../utils/constants/selection-colors.ts";
import { useEffect } from "react";

export default function InvertSelection() {
  const { filter, setFilter, setFilterValues } = useBoothContext();

  useEffect(() => {
    if (!filter.invert) {
      setFilter((prevFilter: FiltersType) => ({
        ...prevFilter,
        invert: inverts[0].value,
      }));
    }
  }, [filter.invert, setFilter]);

  const handleInvertChange = (value: FilterValues) => {
    setFilter((prevFilter: FiltersType) => ({
      ...prevFilter,
      invert: value.value,
    }));
    setFilterValues((prevFilterValues: FiltersType) => ({
      ...prevFilterValues,
      invert: value.style,
    }));
  };

  return (
    <div className="flex items-center gap-5">
      <h2 className="text-md font-bold">Invert</h2>
      <div className="flex gap-2">
        {inverts.map((level: FilterValues, index: number) => (
          <div
            key={level.value}
            className={`h-8 w-8 cursor-pointer rounded-full ${SelectionColor[index]}`}
            style={{
              border: filter.invert === level.value ? "2px solid" : "none",
            }}
            onClick={() => handleInvertChange(level)}
          ></div>
        ))}
      </div>
    </div>
  );
}
