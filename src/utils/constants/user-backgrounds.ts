import { backgrounds } from "./background";
import { borders } from "./border";

export function getBackgroundColor(value: number) {
  const background = backgrounds.find((bg) => bg.value === value);
  return background ? background.background : backgrounds[0].background;
}

export function getBorderColor(value: number) {
  const border = borders.find((border) => border.value === value);
  return border ? border.border : borders[0].border;
}
