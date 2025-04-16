import minecraft1 from "../../../assets/stickers/minecraft/steve.webp";
import minecraft2 from "../../../assets/stickers/minecraft/pig.webp";
import minecraft3 from "../../../assets/stickers/minecraft/game.webp";
import minecraft4 from "../../../assets/stickers/minecraft/tnt.webp";
import minecraft5 from "../../../assets/stickers/minecraft/creeper.webp";
import minecraft6 from "../../../assets/stickers/minecraft/m-logo.webp";
import minecraft7 from "../../../assets/stickers/minecraft/heart.webp";
import minecraft8 from "../../../assets/stickers/minecraft/poisonous.webp";
import minecraft9 from "../../../assets/stickers/minecraft/wolf.webp";
import minecraft10 from "../../../assets/stickers/minecraft/zombie.webp";
import minecraft11 from "../../../assets/stickers/minecraft/sword.webp";
import minecraft12 from "../../../assets/stickers/minecraft/mining.webp";
import { positionsCam } from "../../../utils/constants/image-position";

export default function MinecraftStickers({
  set,
  type,
}: {
  set: number;
  type: string;
}) {
  const stickers = [
    [minecraft1, minecraft2, minecraft3, minecraft4],
    [minecraft5, minecraft6, minecraft7, minecraft8],
    [minecraft9, minecraft10, minecraft11, minecraft12],
  ];

  const stickerNames = [
    ["steve", "pig", "game", "tnt"],
    ["creeper", "m-logo", "heart", "poisonous"],
    ["wolf", "zombie", "sword", "mining"],
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
