import { stickerPack } from "../../utils/constants/stickers";
import { useBoothContext } from "../../lib/context/booth";
import { Sticker } from "../../utils/types";

export default function StickerSelection() {
  const { setSticker } = useBoothContext();
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="grid grid-cols-2 gap-2">
        {stickerPack.map((sticker: Sticker) => (
          <img
            onClick={() => setSticker(sticker.value)}
            key={sticker.name}
            src={sticker.image}
            alt={sticker.name}
            className="w-20 cursor-pointer object-cover"
          />
        ))}
      </div>
    </div>
  );
}
