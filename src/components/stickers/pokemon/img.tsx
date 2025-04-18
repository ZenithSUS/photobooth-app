import pokemon1 from "../../../assets/stickers/pokemon/pikachu-with-bangs.webp";
import pokemon2 from "../../../assets/stickers/pokemon/charmander-pirate.webp";
import pokemon3 from "../../../assets/stickers/pokemon/gengar.webp";
import pokemon4 from "../../../assets/stickers/pokemon/squirtle-and-charmander.webp";
import pokemon5 from "../../../assets/stickers/pokemon/pokeball.webp";
import pokemon6 from "../../../assets/stickers/pokemon/squirtl-sunglasses.webp";
import pokemon7 from "../../../assets/stickers/pokemon/bulbasaur-charmander.webp";
import pokemon8 from "../../../assets/stickers/pokemon/glaceon-and-flareon.webp";
import pokemon9 from "../../../assets/stickers/pokemon/pikachu-holding-pokeball.webp";
import pokemon10 from "../../../assets/stickers/pokemon/cute-snorlax-and-pikachu.webp";
import pokemon11 from "../../../assets/stickers/pokemon/lucario.webp";
import pokemon12 from "../../../assets/stickers/pokemon/bulbasaur.webp";
import { positionsCam } from "../../../utils/constants/image-position";

export default function PokemonStickers({
  set,
  type,
}: {
  set: number;
  type: string;
}) {
  const stickers = [
    [pokemon1, pokemon2, pokemon3, pokemon4],
    [pokemon5, pokemon6, pokemon7, pokemon8],
    [pokemon9, pokemon10, pokemon11, pokemon12],
  ];

  const stickerNames = [
    [
      "Pikachu with Bangs",
      "Charmander Pirate",
      "Gengar",
      "Squirtle and Charmander",
    ],
    [
      "Pokeball",
      "Squirtle Sunglasses",
      "Bulbasaur and Charmander",
      "Glaceon and Flareon",
    ],
    [
      "Pikachu Holding Pokeball",
      "Cute Snorlax and Pikachu",
      "Lucario",
      "Bulbasaur",
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
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
