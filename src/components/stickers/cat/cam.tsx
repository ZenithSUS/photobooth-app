import {
  positionsCam,
  imageFlipCam,
} from "../../../utils/constants/image-position";
import cat1 from "../../../assets/stickers/cat/smile.webp";
import cat2 from "../../../assets/stickers/cat/family.webp";
import cat3 from "../../../assets/stickers/cat/friends.webp";
import cat4 from "../../../assets/stickers/cat/in-love.webp";

export default function Cat() {
  const stickers = [cat1, cat2, cat3, cat4];
  const stickerNames = ["smile", "family", "friends", "in-love"];

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
            ...imageFlipCam[index],
          }}
        />
      ))}
    </>
  );
}
