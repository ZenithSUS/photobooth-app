import { createContext, useContext, useState } from "react";
import { filtersType } from "../../utils/types";

type BoothContextType = {
  capturedImage: Object[];
  setCapturedImage: React.Dispatch<React.SetStateAction<Object[]>>;
  filter: filtersType;
  setFilter: React.Dispatch<React.SetStateAction<filtersType>>;
  prevFilter: filtersType[];
  setPrevFilter: React.Dispatch<React.SetStateAction<filtersType[]>>;
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
});

export const BoothProvider = ({ children }: Props) => {
  const [capturedImage, setCapturedImage] = useState<Object[]>([]);

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
      }}
    >
      {children}
    </BoothContext.Provider>
  );
};

export const useBoothContext = () => useContext(BoothContext);
