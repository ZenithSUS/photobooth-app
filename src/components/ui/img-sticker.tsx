import Axlot from "../stickers/axlot/cam.tsx";
import Minecraft from "../stickers/minecraft/cam.tsx";
import Cat from "../stickers/cat/cam.tsx";
import Bear from "../stickers/bear/cam.tsx";
import Gamer from "../stickers/gamer/cam.tsx";
import DemonSlayer from "../stickers/demon-slayer/cam.tsx";
import Naruto from "../stickers/naruto/cam.tsx";
import Pokemon from "../stickers/pokemon/cam.tsx";
import Coffee from "../stickers/coffee/cam.tsx";

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
};

export const getCurrentImgSticker = ({ sticker }: StickerType) => {
  switch (sticker) {
    case "Axlot":
      return <Axlot />;
    case "Minecraft":
      return <Minecraft />;
    case "Cat":
      return <Cat />;
    case "Bear":
      return <Bear />;
    case "Gamer":
      return <Gamer />;
    case "DemonSlayer":
      return <DemonSlayer />;
    case "Naruto":
      return <Naruto />;
    case "Pokemon":
      return <Pokemon />;
    case "Coffee":
      return <Coffee />;
    default:
      return null;
  }
};
