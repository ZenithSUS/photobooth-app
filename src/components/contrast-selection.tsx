import { useBoothContext } from "../context/booth-provider";
import { contrasts } from "../utils/filter-values";
import { filtersType, filterValues } from "../utils/types";

export default function ContrastSelection() {
  const { filter, setFilter } = useBoothContext();
  return (
    <div className="flex items-center gap-5">
      <h2 className="text-md font-bold">Contrast</h2>
      <div className="flex gap-2">
        {contrasts.map((level: filterValues) => (
          <div
            key={level.value}
            className={`w-8 h-8 rounded-full cursor-pointer`}
            style={{
              backgroundColor: `hsl(${level.value * 3.6}, ${
                50 + level.value / 2
              }%, ${40 + level.value / 3}%)`,
              border: filter.contrast === level.value ? "2px solid" : "none",
            }}
            onClick={() =>
              setFilter((prevFilter: filtersType) => ({
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
