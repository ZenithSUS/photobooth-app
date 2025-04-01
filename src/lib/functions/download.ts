import { filtersType } from "../../utils/types";

export default function downloadAllImages(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  capturedImage: Object[],
  prevFilter: filtersType[]
) {
  console.log(capturedImage);
  if (canvasRef.current && capturedImage.length === 3) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      canvas.width = 900;
      canvas.height = 300;
      capturedImage.forEach((image: Object, index: number) => {
        const img = new Image();
        img.src = URL.createObjectURL(image as Blob);

        img.onload = () => {
          const filter = prevFilter[index];
          ctx.filter = `
              grayscale(${filter.grayscale}%)
              sepia(${filter.sepia}%)
              hue-rotate(${filter.hueRotate}deg)
              invert(${filter.invert}%)
              brightness(${filter.brightness}%)
              contrast(${filter.contrast}%)
            `;
          ctx.drawImage(img, index * 300, 0, 300, 300);

          if (index === capturedImage.length - 1) {
            const link = document.createElement("a");
            link.download = "photobooth.png";
            link.href = canvas.toDataURL();
            link.click();
            URL.revokeObjectURL(img.src);
          }
        };
      });
    }
  }
}
