import coffee1 from "../../../assets/stickers/coffee/coffee-holding-coffee.webp";
import coffee2 from "../../../assets/stickers/coffee/coffee-word.webp";
import coffee3 from "../../../assets/stickers/coffee/dripper.webp";
import coffee4 from "../../../assets/stickers/coffee/sloth.webp";
import coffee5 from "../../../assets/stickers/coffee/coffee-word2.webp";
import coffee6 from "../../../assets/stickers/coffee/hot-tea.webp";
import coffee7 from "../../../assets/stickers/coffee/coffee-glass.webp";
import coffee8 from "../../../assets/stickers/coffee/coffee-umbrella.webp";
import coffee9 from "../../../assets/stickers/coffee/coffee-word3.webp";
import coffee10 from "../../../assets/stickers/coffee/nap.webp";
import coffee11 from "../../../assets/stickers/coffee/coffee-word4.webp";
import coffee12 from "../../../assets/stickers/coffee/break.webp";
import { positionsCam } from "../../../utils/constants/image-position";

export default function CoffeeStickers({
  set,
  type,
}: {
  set: number;
  type: string;
}) {
  const stickers = [
    [coffee1, coffee2, coffee3, coffee4],
    [coffee5, coffee6, coffee7, coffee8],
    [coffee9, coffee10, coffee11, coffee12],
  ];

  const stickerNames = [
    ["coffee-holding-coffee", "coffee-word", "dripper", "sloth"],
    ["coffee-word2", "hot-tea", "coffee-glass", "coffee-umbrella"],
    ["coffee-word3", "nap", "coffee-word4", "break"],
  ];

  if (set >= 1 && set <= stickers.length) {
    return (
      <div>
        {stickers[set - 1].map((sticker, index) => (
          <img
            key={index}
            src={sticker}
            alt={stickerNames[set - 1][index]}
            className={`object-fit absolute z-10 ${type === "Cam" ? "w-15 md:w-20" : "w-14 md:w-12"}`}
            style={{
              ...positionsCam[index],
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
