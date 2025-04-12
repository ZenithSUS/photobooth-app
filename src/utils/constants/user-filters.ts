import {
  inverts,
  sepias,
  brightnesses,
  grayscales,
  contrasts,
  hues,
} from "./filter-values";

export const getInvert = (invert: number | string) => {
  const userInvert = inverts.find((i) => i.style === invert);
  return userInvert ? userInvert.style : inverts[0].style;
};

export const getSepia = (sepia: number | string) => {
  const userSepia = sepias.find((s) => s.style === sepia);
  return userSepia ? userSepia.style : sepias[0].style;
};

export const getBrightness = (brightness: number | string) => {
  const userBrightness = brightnesses.find((b) => b.style === brightness);
  return userBrightness ? userBrightness.style : brightnesses[0].style;
};
export const getGrayscale = (grayscale: number | string) => {
  const userGrayscale = grayscales.find((g) => g.style === grayscale);
  return userGrayscale ? userGrayscale.style : grayscales[0].style;
};

export const getContrast = (contrast: number | string) => {
  const userContrast = contrasts.find((c) => c.style === contrast);
  return userContrast ? userContrast.style : contrasts[0].style;
};
export const getHue = (hue: number | string) => {
  const userHue = hues.find((h) => h.style === hue);
  return userHue ? userHue.style : hues[0].style;
};
