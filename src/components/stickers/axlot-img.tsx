import axlot1 from "../../assets/stickers/axlot/amazed.png";
import axlot2 from "../../assets/stickers/axlot/flowers.png";
import axlot3 from "../../assets/stickers/axlot/yes.png";
import axlot4 from "../../assets/stickers/axlot/read.png";
import axlot5 from "../../assets/stickers/axlot/amazed2.png";
import axlot6 from "../../assets/stickers/axlot/hi.png";
import axlot7 from "../../assets/stickers/axlot/love.png";
import axlot8 from "../../assets/stickers/axlot/love2.png";
import axlot9 from "../../assets/stickers/axlot/sing.png";
import axlot10 from "../../assets/stickers/axlot/happy.png";
import axlot11 from "../../assets/stickers/axlot/laugh.png";
import axlot12 from "../../assets/stickers/axlot/hug.png";
import {
  positionsCam,
  imageFlipCam,
} from "../../utils/constants/image-position";

export default function AxlotStickers({ set }: { set: number }) {
  const stickers = [
    [axlot1, axlot2, axlot3, axlot4],
    [axlot5, axlot6, axlot7, axlot8],
    [axlot9, axlot10, axlot11, axlot12],
  ];

  const stickerNames = [
    ["amazed", "flowers", "yes", "read"],
    ["amazed2", "hi", "love", "love2"],
    ["sing", "happy", "laugh", "hug"],
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
              ...imageFlipCam[index],
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
