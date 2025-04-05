import { useBoothContext } from "../../lib/context/booth.tsx";
import { filtersType, filterValues } from "../../utils/types.ts";
import { inverts } from "../../utils/constants/filter-values.ts";
import { SelectionColor } from "../../utils/constants/selection-colors.ts";
import { useEffect } from "react";

export default function InvertSelection() {
  const { filter, setFilter } = useBoothContext();

  useEffect(() => {
    if (!filter.invert) {
      setFilter((prevFilter: filtersType) => ({
        ...prevFilter,
        invert: inverts[0].value,
      }));
    }
  }, [filter.invert, setFilter]);

  return (
    <div className="flex items-center gap-5">
      <h2 className="text-md font-bold">Invert</h2>
      <div className="flex gap-2">
        {inverts.map((level: filterValues, index: number) => (
          <div
            key={level.value}
            className={`w-8 h-8 rounded-full cursor-pointer ${SelectionColor[index]}`}
            style={{
              border: filter.invert === level.value ? "2px solid" : "none",
            }}
            onClick={() =>
              setFilter((prevFilter: filtersType) => ({
                ...prevFilter,
                invert: level.value,
              }))
            }
          ></div>
        ))}
      </div>
    </div>
  );
}
