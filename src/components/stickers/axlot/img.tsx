import axlot1 from "../../../assets/stickers/axlot/amazed.webp";
import axlot2 from "../../../assets/stickers/axlot/flowers.webp";
import axlot3 from "../../../assets/stickers/axlot/yes.webp";
import axlot4 from "../../../assets/stickers/axlot/read.webp";
import axlot5 from "../../../assets/stickers/axlot/amazed2.webp";
import axlot6 from "../../../assets/stickers/axlot/hi.webp";
import axlot7 from "../../../assets/stickers/axlot/love.webp";
import axlot8 from "../../../assets/stickers/axlot/love2.webp";
import axlot9 from "../../../assets/stickers/axlot/sing.webp";
import axlot10 from "../../../assets/stickers/axlot/happy.webp";
import axlot11 from "../../../assets/stickers/axlot/laugh.webp";
import axlot12 from "../../../assets/stickers/axlot/hug.webp";
import {
  positionsCam,
  imageFlipCam,
} from "../../../utils/constants/image-position";

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
            className={`object-fit absolute z-10 w-14 md:w-12`}
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
