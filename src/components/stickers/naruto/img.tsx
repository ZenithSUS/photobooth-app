import Naruto1 from "../../../assets/stickers/naruto/naruto.webp";
import Naruto2 from "../../../assets/stickers/naruto/sasuke.webp";
import Naruto3 from "../../../assets/stickers/naruto/sakura.webp";
import Naruto4 from "../../../assets/stickers/naruto/kakashi.webp";
import Naruto5 from "../../../assets/stickers/naruto/naruhina.webp";
import Naruto6 from "../../../assets/stickers/naruto/ramen.webp";
import Naruto7 from "../../../assets/stickers/naruto/jiraiya.webp";
import Naruto8 from "../../../assets/stickers/naruto/itachi.webp";
import Naruto9 from "../../../assets/stickers/naruto/madara.webp";
import Naruto10 from "../../../assets/stickers/naruto/itachi-christmas.webp";
import Naruto11 from "../../../assets/stickers/naruto/lee.webp";
import Naruto12 from "../../../assets/stickers/naruto/happy-naruto.webp";
import { positionsCam } from "../../../utils/constants/image-position";

export default function NarutoStickers({
  set,
  type,
}: {
  set: number;
  type: string;
}) {
  const stickers = [
    [Naruto1, Naruto2, Naruto3, Naruto4],
    [Naruto5, Naruto6, Naruto7, Naruto8],
    [Naruto9, Naruto10, Naruto11, Naruto12],
  ];

  const stickerNames = [
    ["Naruto", "Sasuke", "Sakura", "Kakashi"],
    ["Naruhina", "Ramen", "Jiraiya", "Itachi"],
    ["Madara", "Itachi-Christmas", "Lee", "Happy-Naruto"],
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
