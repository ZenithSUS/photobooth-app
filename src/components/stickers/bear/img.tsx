import bear1 from "../../../assets/stickers/bear/smile.webp";
import bear2 from "../../../assets/stickers/bear/love.webp";
import bear3 from "../../../assets/stickers/bear/phone.webp";
import bear4 from "../../../assets/stickers/bear/reading.webp";
import bear5 from "../../../assets/stickers/bear/flying.webp";
import bear6 from "../../../assets/stickers/bear/balloon.webp";
import bear7 from "../../../assets/stickers/bear/megaphone.webp";
import bear8 from "../../../assets/stickers/bear/approved.webp";
import bear9 from "../../../assets/stickers/bear/shocked.webp";
import bear10 from "../../../assets/stickers/bear/sleeping.webp";
import bear11 from "../../../assets/stickers/bear/sunny.webp";
import bear12 from "../../../assets/stickers/bear/cup.webp";
import {
  positionsCam,
  imageFlipCam,
} from "../../../utils/constants/image-position";

export default function BearStickers({
  set,
  type,
}: {
  set: number;
  type: string;
}) {
  const stickers = [
    [bear1, bear2, bear3, bear4],
    [bear5, bear6, bear7, bear8],
    [bear9, bear10, bear11, bear12],
  ];

  const stickerNames = [
    ["smile", "love", "phone", "reading"],
    ["flying", "balloon", "megaphone", "approved"],
    ["shocked", "sleeping", "sunny", "cup"],
  ];

  if (set >= 1 && set <= stickers.length) {
    return (
      <div>
        {stickers[set - 1].map((sticker, index) => (
          <img
            key={index}
            src={sticker}
            alt={stickerNames[set - 1][index]}
            className={`object-fit absolute z-10 ${type === "Cam" ? "w-15 md:w-20" : "w-14 md:w-12"}`}
            style={{ ...positionsCam[index], ...imageFlipCam[index] }}
          />
        ))}
      </div>
    );
  }

  return null;
}
