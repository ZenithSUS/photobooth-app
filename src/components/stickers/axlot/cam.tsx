import {
  positionsCam,
  imageFlipCam,
} from "../../../utils/constants/image-position";
import axlot1 from "../../../assets/stickers/axlot/amazed.webp";
import axlot2 from "../../../assets/stickers/axlot/flowers.webp";
import axlot3 from "../../../assets/stickers/axlot/yes.webp";
import axlot4 from "../../../assets/stickers/axlot/read.webp";

export default function Axlot() {
  const stickers = [axlot1, axlot2, axlot3, axlot4];
  const stickerNames = ["amazed", "flowers", "yes", "read"];

  return (
    <>
      {stickers.map((sticker, index) => (
        <img
          key={index}
          src={sticker}
          alt={stickerNames[index]}
          className={`object-fit absolute z-10 w-12`}
          style={{
            ...positionsCam[index],
            ...imageFlipCam[index],
          }}
        />
      ))}
    </>
  );
}
