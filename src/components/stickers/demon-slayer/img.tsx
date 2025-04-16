import demonSlayer1 from "../../../assets/stickers/demon-slayer/tanjiro-w-nezuko.webp";
import demonSlayer2 from "../../../assets/stickers/demon-slayer/mitsuri-kanroji-kawaii.webp";
import demonSlayer3 from "../../../assets/stickers/demon-slayer/zenitsu-chibi.webp";
import demonSlayer4 from "../../../assets/stickers/demon-slayer/happy-rengoku-sticker.webp";
import demonSlayer5 from "../../../assets/stickers/demon-slayer/christmas-nezuko-with-reindeer-antlers.webp";
import demonSlayer6 from "../../../assets/stickers/demon-slayer/mitsuri-kanroji-blushing.webp";
import demonSlayer7 from "../../../assets/stickers/demon-slayer/zenitsu-with-katana.webp";
import demonSlayer8 from "../../../assets/stickers/demon-slayer/tanjiro-flame.webp";
import demonSlayer9 from "../../../assets/stickers/demon-slayer/cute-nezuko-by-the-sea.webp";
import demonSlayer10 from "../../../assets/stickers/demon-slayer/aesthetic-giyu.webp";
import demonSlayer11 from "../../../assets/stickers/demon-slayer/inosuke-hashibira.webp";
import demonSlayer12 from "../../../assets/stickers/demon-slayer/serious-kyojuro-rengoku.webp";
import {
  positionsCam,
  imageFlipCam,
} from "../../../utils/constants/image-position";

export default function DemonSlayerStickers({
  set,
  type,
}: {
  set: number;
  type: string;
}) {
  const stickers = [
    [demonSlayer1, demonSlayer2, demonSlayer3, demonSlayer4],
    [demonSlayer5, demonSlayer6, demonSlayer7, demonSlayer8],
    [demonSlayer9, demonSlayer10, demonSlayer11, demonSlayer12],
  ];
  const stickerNames = [
    [
      "tanjiro-w-nezuko",
      "mitsuri-kanroji-kawaii",
      "zenitsu-chibi",
      "mitsuri-kanroji-blushing",
    ],
    [
      "christmas-nezuko-with-reindeer-antlers",
      "happy-rengoku-sticker",
      "zenitsu-with-katana",
      "tanjiro-flame",
    ],
    [
      "cute-nezuko-by-the-sea",
      "aesthetic-giyu",
      "inosuke-hashibira",
      "serious-kyojuro-rengoku",
    ],
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
