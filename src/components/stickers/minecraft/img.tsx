import minecraft1 from "../../../assets/stickers/minecraft/steve.png";
import minecraft2 from "../../../assets/stickers/minecraft/pig.png";
import minecraft3 from "../../../assets/stickers/minecraft/game.png";
import minecraft4 from "../../../assets/stickers/minecraft/tnt.png";
import minecraft5 from "../../../assets/stickers/minecraft/creeper.png";
import minecraft6 from "../../../assets/stickers/minecraft/m-logo.png";
import minecraft7 from "../../../assets/stickers/minecraft/heart.png";
import minecraft8 from "../../../assets/stickers/minecraft/poisonous.png";
import minecraft9 from "../../../assets/stickers/minecraft/wolf.png";
import minecraft10 from "../../../assets/stickers/minecraft/zombie.png";
import minecraft11 from "../../../assets/stickers/minecraft/sword.png";
import minecraft12 from "../../../assets/stickers/minecraft/mining.png";
import { positionsCam } from "../../../utils/constants/image-position";

export default function MinecraftStickers({ set }: { set: number }) {
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
            className={`absolute w-14 md:w-12 object-fit z-10`}
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
