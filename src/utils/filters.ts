const grayscaleFilter = (value: number | string) => `grayscale-${value}`;

const sepiaFilter = (value: number | string) => `sepia-${value}`;

const hueRotateFilter = (value: number | string) => `hue-rotate-${value}`;

const invertFilter = (value: number | string) => `invert${value}`;

const brightnessFilter = (value: number | string) => `brightness-${value}`;

const contrastFilter = (value: number | string) => `contrast-${value}`;

export default {
  grayscaleFilter,
  sepiaFilter,
  hueRotateFilter,
  invertFilter,
  brightnessFilter,
  contrastFilter,
};
