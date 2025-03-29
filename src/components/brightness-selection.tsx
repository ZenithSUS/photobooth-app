import { useBoothContext } from "../context/booth-provider";
import { brightnesses } from "../utils/filter-values";
import { filtersType, filterValues } from "../utils/types";

export default function BrightnessSelection() {
  const { filter, setFilter } = useBoothContext();
  return (
    <div className="flex items-center gap-5">
      <h2 className="text-md font-bold">Brightness</h2>
      <div className="flex gap-2">
        {brightnesses.map((level: filterValues) => (
          <div
            key={level.value}
            className={`w-8 h-8 rounded-full cursor-pointer`}
            style={{
              backgroundColor: `hsl(${level.value * 3.6}, ${
                50 + level.value / 2
              }%, ${40 + level.value / 3}%)`,
              border: filter.brightness === level.value ? "2px solid" : "none",
            }}
            onClick={() =>
              setFilter((prevFilter: filtersType) => ({
                ...prevFilter,
                brightness: level.value,
              }))
            }
          ></div>
        ))}
      </div>
    </div>
  );
}
