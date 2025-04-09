import { positionsCam } from "../../../utils/constants/image-position";
import minecraft1 from "../../../assets/stickers/minecraft/steve.png";
import minecraft2 from "../../../assets/stickers/minecraft/pig.png";
import minecraft3 from "../../../assets/stickers/minecraft/sword.png";
import minecraft4 from "../../../assets/stickers/minecraft/tnt.png";

export default function Minecraft() {
  const stickers = [minecraft1, minecraft2, minecraft3, minecraft4];
  const stickerNames = ["steve", "pig", "sword", "tnt"];

  return (
    <>
      {stickers.map((sticker, index) => (
        <img
          key={index}
          src={sticker}
          alt={stickerNames[index]}
          className={`absolute w-15 md:w-20 object-fit z-10`}
          style={{
            ...positionsCam[index],
          }}
        />
      ))}
    </>
  );
}
