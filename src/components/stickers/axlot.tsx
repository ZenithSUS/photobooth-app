import axlot1 from "../../assets/stickers/amazed.png";
import axlot2 from "../../assets/stickers/yes.png";
import axlot3 from "../../assets/stickers/flowers.png";

export default function Axlot() {
  const stickers = [axlot1, axlot2, axlot3];
  const stickerNames = ["amazed", "yes", "flowers"];
  const positions = [
    { top: "0", left: "0" },
    { top: "0", right: "0" }, 
    { bottom: "0", left: "0" }, 
    { bottom: "0", right: "0" }, 
  ];
  

  return (
    <>
      {stickers.map((sticker, index) => (
        <img
          key={index}
          src={sticker}
          alt={stickerNames[index]}
          className={`absolute w-15 md:w-20 object-fit z-10`}
          style={positions[index % positions.length]} // Cycle through positions
        />
      ))}
    </>
  );
}