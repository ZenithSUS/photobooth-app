const grayscaleFilter = (value: number) => `grayscale-${value}`;

const sepiaFilter = (value: number) => `sepia-${value}`;

const hueRotateFilter = (value: number) => `hue-rotate-${value}`;

const invertFilter = (value: number) => `invert${value}`;

const brightnessFilter = (value: number) => `brightness-${value}`;

const contrastFilter = (value: number) => `contrast-${value}`;

export default {
  grayscaleFilter,
  sepiaFilter,
  hueRotateFilter,
  invertFilter,
  brightnessFilter,
  contrastFilter,
};
