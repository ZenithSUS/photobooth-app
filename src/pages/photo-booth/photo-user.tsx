import { getPhoto } from "../../hooks/photos";
import { useParams } from "react-router-dom";
import Loading from "../../components/ui/loading";
import { useNavigate } from "react-router-dom";
import Axlot from "../../components/stickers/axlot/img";
import Minecraft from "../../components/stickers/minecraft/img";
import Cat from "../../components/stickers/cat/img";

export default function PhotoUser() {
  const { id } = useParams();
  const { data: photo, isLoading, error } = getPhoto(id as string);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const images = [photo?.image1Url, photo?.image2Url, photo?.image3Url];

  return (
    <div className="mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{photo?.title}</h1>
      <div className="grid grid-cols-1 place-items-center gap-2 bg-gradient-to-br border-10 border-amber-400 from-sky-400 via-blue-400 to-indigo-400 p-3.5 rounded-lg shadow-lg">
        {images.map((image, index) => (
          <div className="relative p-0.5">
            {photo?.sticker === "Axlot" && <Axlot set={index + 1} />}
            {photo?.sticker === "Minecraft" && <Minecraft set={index + 1} />}
            {photo?.sticker === "Cat" && <Cat set={index + 1} />}
            <img
              key={index}
              src={image as string}
              alt={`Image ${index + 1}`}
              className="object-cover"
              height={"300px"}
              width={"300px"}
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={handleBack}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
