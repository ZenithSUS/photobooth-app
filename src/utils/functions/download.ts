import DomToImage from "dom-to-image";
import { DownloadType } from "../types";

export default async function downloadAllImages({
  photoBoothRef,
  user,
}: DownloadType) {
  const scale = 2;

  const options = {
    height: photoBoothRef.current.offsetHeight * scale,
    width: photoBoothRef.current.offsetWidth * scale,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: `${photoBoothRef.current.offsetWidth}px`,
      height: `${photoBoothRef.current.offsetHeight}px`,
    },
  };

  if (photoBoothRef.current) {
    const dataUrl = await DomToImage.toPng(photoBoothRef.current, {
      quality: 1,
      ...options,
    });
    const link = document.createElement("a");
    link.download = "photo_booth.png";
    link.href = dataUrl;
    link.click();
  }
}
