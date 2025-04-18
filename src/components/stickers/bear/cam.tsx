import {
  positionsCam,
  imageFlipCam,
} from "../../../utils/constants/image-position";
import bear1 from "../../../assets/stickers/bear/smile.webp";
import bear2 from "../../../assets/stickers/bear/love.webp";
import bear3 from "../../../assets/stickers/bear/phone.webp";
import bear4 from "../../../assets/stickers/bear/reading.webp";

export default function Bear() {
  const stickers = [bear1, bear2, bear3, bear4];
  const stickerNames = ["smile", "love", "phone", "reading"];

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
