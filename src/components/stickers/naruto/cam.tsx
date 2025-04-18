import { positionsCam } from "../../../utils/constants/image-position";
import Naruto1 from "../../../assets/stickers/naruto/naruto.webp";
import Naruto2 from "../../../assets/stickers/naruto/sasuke.webp";
import Naruto3 from "../../../assets/stickers/naruto/sakura.webp";
import Naruto4 from "../../../assets/stickers/naruto/kakashi.webp";

export default function Naruto() {
  const stickers = [Naruto1, Naruto2, Naruto3, Naruto4];
  const stickerNames = ["Naruto", "Sasuke", "Sakura", "Kakashi"];

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
          }}
        />
      ))}
    </>
  );
}
