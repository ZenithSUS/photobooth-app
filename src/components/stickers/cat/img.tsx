import cat1 from "../../../assets/stickers/cat/smile.webp";
import cat2 from "../../../assets/stickers/cat/family.webp";
import cat3 from "../../../assets/stickers/cat/friends.webp";
import cat4 from "../../../assets/stickers/cat/in-love.webp";
import cat5 from "../../../assets/stickers/cat/eat.webp";
import cat6 from "../../../assets/stickers/cat/reading.webp";
import cat7 from "../../../assets/stickers/cat/eat2.webp";
import cat8 from "../../../assets/stickers/cat/smile2.webp";
import cat9 from "../../../assets/stickers/cat/taco.webp";
import cat10 from "../../../assets/stickers/cat/cat.webp";
import cat11 from "../../../assets/stickers/cat/hungry.webp";
import cat12 from "../../../assets/stickers/cat/love.webp";
import { positionsCam } from "../../../utils/constants/image-position";

export default function CatStickers({
  set,
  type,
}: {
  set: number;
  type: string;
}) {
  const stickers = [
    [cat1, cat2, cat3, cat4],
    [cat5, cat6, cat7, cat8],
    [cat9, cat10, cat11, cat12],
  ];
  const stickerNames = [
    ["smile", "family", "friends", "in-love"],
    ["eat", "reading", "eat2", "smile2"],
    ["taco", "cat", "hungry", "love"],
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
