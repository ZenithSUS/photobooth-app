import { positionsCam } from "../../../utils/constants/image-position";
import pokemon1 from "../../../assets/stickers/pokemon/pikachu-with-bangs.webp";
import pokemon2 from "../../../assets/stickers/pokemon/charmander-pirate.webp";
import pokemon3 from "../../../assets/stickers/pokemon/gengar.webp";
import pokemon4 from "../../../assets/stickers/pokemon/squirtle-and-charmander.webp";

export default function Pokemon() {
  const stickers = [pokemon1, pokemon2, pokemon3, pokemon4];
  const stickerNames = [
    "Pikachu with Bangs",
    "Charmander Pirate",
    "Gengar",
    "Squirtle and Charmander",
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
