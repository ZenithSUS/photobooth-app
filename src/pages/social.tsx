import { getAllPhotos } from "../hooks/photos";
import { useNavigate } from "react-router-dom";
import Loading from "../components/ui/loading";

export default function Social() {
  const { data: photos, isLoading } = getAllPhotos();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center text-3xl font-bold">No photos available</div>
    );
  }

  const handleView = (id: string) => {
    navigate(`/photo-booth/${id}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold mb-4">Social Page</h1>
      <div className="grid grid-cols-1 place-items-center gap-4">
        {photos?.map((photo) => (
          <div
            key={photo.$id}
            className="place-items-center bg-gradient-to-br from-cyan-400 via-teal-400 to-blue-500 p-4 rounded shadow-md"
          >
            <h1 className="text-center font-bold">{photo.$id}</h1>
            <button
              onClick={() => handleView(photo.$id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer transition duration-300 ease-in-out"
            >
              See Photo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
