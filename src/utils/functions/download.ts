import DomToImage from "dom-to-image";
import { downloadType } from "../types";

export default async function downloadAllImages({
  photoBoothRef,
}: downloadType) {
  if (photoBoothRef.current) {
    const dataUrl = await DomToImage.toPng(photoBoothRef.current, {
      quality: 1,
    });
    const link = document.createElement("a");
    link.download = "photo_booth.png";
    link.href = dataUrl;
    link.click();
  }
}
