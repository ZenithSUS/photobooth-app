import {
  getBrightness,
  getContrast,
  getHue,
  getGrayscale,
  getInvert,
  getSepia,
} from "../../utils/constants/user-filters";

export default function userFilter(filters: string[]) {
  return `${getSepia(filters[0])} ${getGrayscale(filters[1])} ${getHue(filters[2])} ${getInvert(filters[3])} ${getBrightness(filters[4])} ${getContrast(filters[5])}`;
}
