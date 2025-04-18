import { positionsCam } from "../../../utils/constants/image-position";
import coffee1 from "../../../assets/stickers/coffee/coffee-holding-coffee.webp";
import coffee2 from "../../../assets/stickers/coffee/coffee-word.webp";
import coffee3 from "../../../assets/stickers/coffee/dripper.webp";
import coffee4 from "../../../assets/stickers/coffee/sloth.webp";

export default function Coffee() {
  const stickers = [coffee1, coffee2, coffee3, coffee4];
  const stickerNames = [
    "coffee-holding-coffee",
    "coffee-word",
    "dripper",
    "sloth",
  ];

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
