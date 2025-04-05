import { createContext, useContext, useState } from "react";
import { filtersType } from "../../utils/types";

type BoothContextType = {
  capturedImage: Object[];
  setCapturedImage: React.Dispatch<React.SetStateAction<Object[]>>;
  filter: filtersType;
  setFilter: React.Dispatch<React.SetStateAction<filtersType>>;
  prevFilter: filtersType[];
  setPrevFilter: React.Dispatch<React.SetStateAction<filtersType[]>>;
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  borderColor: string;
  setBorderColor: React.Dispatch<React.SetStateAction<string>>;
};

type Props = {
  children: React.ReactNode;
};

export const BoothContext = createContext<BoothContextType>({
  capturedImage: [],
  setCapturedImage: () => {},
  filter: {
    sepia: 0,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    brightness: 0,
    contrast: 0,
  },
  setFilter: () => {},
  prevFilter: [
    {
      sepia: 0,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      brightness: 0,
      contrast: 0,
    },
  ],
  setPrevFilter: () => {},
  backgroundColor: "bg-gradient-to-br from-amber-400 via-orange-400 to-red-400",
  setBackgroundColor: () => {},
  borderColor: "border-sky-400",
  setBorderColor: () => {},
});

export const BoothProvider = ({ children }: Props) => {
  const [capturedImage, setCapturedImage] = useState<Object[]>([]);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    "bg-gradient-to-br from-amber-400 via-orange-400 to-red-400"
  );
  const [borderColor, setBorderColor] = useState<string>("border-sky-400");
  const [filter, setFilter] = useState<filtersType>({
    sepia: 0,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    brightness: 100,
    contrast: 100,
  });

  const [prevFilter, setPrevFilter] = useState<filtersType[]>([]);

  return (
    <BoothContext.Provider
      value={{
        capturedImage,
        setCapturedImage,
        filter,
        setFilter,
        prevFilter,
        setPrevFilter,
        backgroundColor,
        setBackgroundColor,
        borderColor,
        setBorderColor,
      }}
    >
      {children}
    </BoothContext.Provider>
  );
};

export const useBoothContext = () => useContext(BoothContext);
