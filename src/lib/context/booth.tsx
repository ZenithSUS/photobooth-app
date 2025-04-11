import { createContext, useContext, useState } from "react";
import { FiltersType } from "../../utils/types";

type BoothContextType = {
  capturedImage: Object[];
  setCapturedImage: React.Dispatch<React.SetStateAction<Object[]>>;
  filter: FiltersType;
  setFilter: React.Dispatch<React.SetStateAction<FiltersType>>;
  prevFilter: FiltersType[];
  setPrevFilter: React.Dispatch<React.SetStateAction<FiltersType[]>>;
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  backgroundValue: string;
  setBackgroundValue: React.Dispatch<React.SetStateAction<string>>;
  borderColor: string;
  setBorderColor: React.Dispatch<React.SetStateAction<string>>;
  borderValue: string;
  setBorderValue: React.Dispatch<React.SetStateAction<string>>;
  isCapturing: boolean;
  setIsCapturing: React.Dispatch<React.SetStateAction<boolean>>;
  sticker: string;
  setSticker: React.Dispatch<React.SetStateAction<string>>;
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
  isCapturing: false,
  setIsCapturing: () => {},
  sticker: "N/A",
  setSticker: () => {},
  backgroundValue: "",
  setBackgroundValue: () => {},
  borderValue: "",
  setBorderValue: () => {},
});

export const BoothProvider = ({ children }: Props) => {
  const [capturedImage, setCapturedImage] = useState<Object[]>([]);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    "bg-gradient-to-br from-amber-400 via-orange-400 to-red-400",
  );
  const [backgroundValue, setBackgroundValue] = useState<string>("");
  const [borderColor, setBorderColor] = useState<string>("border-sky-400");
  const [borderValue, setBorderValue] = useState<string>("");
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [filter, setFilter] = useState<FiltersType>({
    sepia: 0,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    brightness: 100,
    contrast: 100,
  });
  const [sticker, setSticker] = useState<string>("N/A");
  const [prevFilter, setPrevFilter] = useState<FiltersType[]>([]);

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
        backgroundValue,
        setBackgroundValue,
        borderColor,
        setBorderColor,
        borderValue,
        setBorderValue,
        isCapturing,
        setIsCapturing,
        sticker,
        setSticker,
      }}
    >
      {children}
    </BoothContext.Provider>
  );
};

export const useBoothContext = () => useContext(BoothContext);
