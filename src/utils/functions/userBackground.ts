import {
  getBackgroundColor,
  getBorderColor,
} from "../../utils/constants/user-backgrounds";

export default function userBackground(
  background: number,
  border: number,
): string {
  return `${getBackgroundColor(background)} ${getBorderColor(border)}`;
}
