import GrayscaleSelection from "./grayscale-selections";
import SepiaSelection from "./sepia-selection";
import BrightnessSelection from "./brightness-selection";
import ContrastSelection from "./contrast-selection";
import InvertSelection from "./invert-selection";

export default function Filters() {
  return (
    <main className="flex flex-col gap-3 justify-center">
      <h1 className="text-2xl font-bold text-center">Filters</h1>
      <InvertSelection />
      <SepiaSelection />
      <BrightnessSelection />
      <GrayscaleSelection />
      <ContrastSelection />
    </main>
  );
}
