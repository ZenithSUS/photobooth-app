import { stickerPack } from "../../utils/constants/stickers";
import { useBoothContext } from "../../lib/context/booth";
import { Sticker } from "../../utils/types";

export default function StickerSelection() {
  const { setSticker } = useBoothContext();
  return (
    <div className="grid place-items-center gap-5">
      <div className="grid grid-cols-4 gap-5">
        {stickerPack.map((sticker: Sticker) => (
          <img
            onClick={() => setSticker(sticker.value)}
            key={sticker.name}
            src={sticker.image}
            alt={sticker.name}
            className="object-fit w-20 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}
