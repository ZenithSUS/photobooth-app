import gamer1 from "../../../assets/stickers/gamer/press-start.webp";
import gamer2 from "../../../assets/stickers/gamer/gamer.webp";
import gamer3 from "../../../assets/stickers/gamer/gg.webp";
import gamer4 from "../../../assets/stickers/gamer/gamepad.webp";
import gamer5 from "../../../assets/stickers/gamer/gamer2.webp";
import gamer6 from "../../../assets/stickers/gamer/joystick.webp";
import gamer7 from "../../../assets/stickers/gamer/video-game.webp";
import gamer8 from "../../../assets/stickers/gamer/drink.webp";
import gamer9 from "../../../assets/stickers/gamer/dice.webp";
import gamer10 from "../../../assets/stickers/gamer/level-up.webp";
import gamer11 from "../../../assets/stickers/gamer/gaming.webp";
import gamer12 from "../../../assets/stickers/gamer/video-game2.webp";
import { positionsCam } from "../../../utils/constants/image-position";

export default function GamerStickers({ set }: { set: number }) {
  const stickers = [
    [gamer1, gamer2, gamer3, gamer4],
    [gamer5, gamer6, gamer7, gamer8],
    [gamer9, gamer10, gamer11, gamer12],
  ];
  const stickerNames = [
    ["press-start", "gamer", "gg", "gamepad"],
    ["gamer2", "joystick", "video-game", "drink"],
    ["dice", "level-up", "gaming", "video-game2"],
  ];

  if (set >= 1 && set <= stickers.length) {
    return (
      <div>
        {stickers[set - 1].map((sticker, index) => (
          <img
            key={index}
            src={sticker}
            alt={stickerNames[set - 1][index]}
            className={`object-fit absolute z-10 w-14 md:w-12`}
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
