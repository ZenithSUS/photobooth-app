import {
  positionsCam,
  imageFlipCam,
} from "../../utils/constants/image-position";
import axlot1 from "../../assets/stickers/axlot/amazed.png";
import axlot2 from "../../assets/stickers/axlot/flowers.png";
import axlot3 from "../../assets/stickers/axlot/yes.png";
import axlot4 from "../../assets/stickers/axlot/read.png";

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
          className={`absolute w-15 md:w-20 object-fit z-10`}
          style={{
            ...positionsCam[index],
            ...imageFlipCam[index],
          }}
        />
      ))}
    </>
  );
}
