import Axlot from "../stickers/axlot/img.tsx";
import Minecraft from "../stickers/minecraft/img.tsx";
import Cat from "../stickers/cat/img.tsx";
import Bear from "../stickers/bear/img.tsx";
import Gamer from "../stickers/gamer/img.tsx";
import DemonSlayer from "../stickers/demon-slayer/img.tsx";
import Naruto from "../stickers/naruto/img.tsx";
import Pokemon from "../stickers/pokemon/img.tsx";
import Coffee from "../stickers/coffee/img.tsx";

type StickerType = {
  sticker:
    | "Axlot"
    | "Minecraft"
    | "Cat"
    | "Bear"
    | "Gamer"
    | "DemonSlayer"
    | "Naruto"
    | "Pokemon"
    | "Coffee"
    | "N/A"
    | string;
  set: number;
  type: string;
};

export default function getCurrentSticker({ sticker, set, type }: StickerType) {
  switch (sticker) {
    case "Axlot":
      return <Axlot set={set} type={type} />;
    case "Minecraft":
      return <Minecraft set={set} type={type} />;
    case "Cat":
      return <Cat set={set} type={type} />;
    case "Bear":
      return <Bear set={set} type={type} />;
    case "Gamer":
      return <Gamer set={set} type={type} />;
    case "DemonSlayer":
      return <DemonSlayer set={set} type={type} />;
    case "Naruto":
      return <Naruto set={set} type={type} />;
    case "Pokemon":
      return <Pokemon set={set} type={type} />;
    case "Coffee":
      return <Coffee set={set} type={type} />;
    default:
      return null;
  }
}
