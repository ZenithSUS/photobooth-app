import {
  positionsCam,
  imageFlipCam,
} from "../../../utils/constants/image-position";
import demonSlayer1 from "../../../assets/stickers/demon-slayer/tanjiro-w-nezuko.webp";
import demonSlayer2 from "../../../assets/stickers/demon-slayer/mitsuri-kanroji-kawaii.webp";
import demonSlayer3 from "../../../assets/stickers/demon-slayer/zenitsu-chibi.webp";
import demonSlayer4 from "../../../assets/stickers/demon-slayer/happy-rengoku-sticker.webp";

export default function DemonSlayer() {
  const stickers = [demonSlayer1, demonSlayer2, demonSlayer3, demonSlayer4];
  const stickerNames = [
    "tanjiro-w-nezuko",
    "mitsuri-kanroji-kawaii",
    "zenitsu-chibi",
    "mitsuri-kanroji-blushing",
  ];

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
