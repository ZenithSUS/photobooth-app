import { createContext, useContext, useState } from "react";

type BoothContextType = {
  capturedImage: Object[];
  setCapturedImage: React.Dispatch<React.SetStateAction<Object[]>>;
};

type Props = {
  children: React.ReactNode;
};

export const BoothContext = createContext<BoothContextType>({
  capturedImage: [],
  setCapturedImage: () => {},
});

export const BoothProvider = ({ children }: Props) => {
  const [capturedImage, setCapturedImage] = useState<Object[]>([]);

  return (
    <BoothContext.Provider value={{ capturedImage, setCapturedImage }}>
      {children}
    </BoothContext.Provider>
  );
};

export const useBoothContext = () => useContext(BoothContext);
