import { positionsCam } from "../../../utils/constants/image-position";
import gamer1 from "../../../assets/stickers/gamer/press-start.webp";
import gamer2 from "../../../assets/stickers/gamer/gamer.webp";
import gamer3 from "../../../assets/stickers/gamer/gg.webp";
import gamer4 from "../../../assets/stickers/gamer/gamepad.webp";

export default function Gamer() {
  const stickers = [gamer1, gamer2, gamer3, gamer4];
  const stickerNames = ["press-start", "gamer", "gg", "gamepad"];

  return (
    <>
      {stickers.map((sticker, index) => (
        <img
          key={index}
          src={sticker}
          alt={stickerNames[index]}
          className={`object-fit absolute z-10 w-15 md:w-20`}
          style={{
            ...positionsCam[index],
          }}
        />
      ))}
    </>
  );
}
