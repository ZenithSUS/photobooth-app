import { getPhoto } from "../../hooks/photos";
import { useParams } from "react-router-dom";
import Loading from "../../components/ui/loading";
import { useNavigate } from "react-router-dom";

export default function PhotoUser() {
    const { id } = useParams();
    const { data: photo, isLoading, error } = getPhoto(id as string);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/");
    }

    if (isLoading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;


    return (
        <div className="mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Photo ID: {photo?.$id}</h1>
            <div className="grid grid-cols-1 place-items-center gap-2 bg-gradient-to-br border-10 border-amber-400 from-sky-400 via-blue-400 to-indigo-400 p-4 rounded-lg shadow-lg">
                <img src={photo?.image1Url as string} alt="Image 1" className="w-64 h-64 object-cover" />
                <img src={photo?.image2Url as string} alt="Image 2" className="w-64 h-64 object-cover" />
                <img src={photo?.image3Url as string} alt="Image 3" className="w-64 h-64 object-cover" />
            </div>

            <div className="mt-4">
                <button onClick={handleBack} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 cursor-pointer">
                    Go Back
                </button>
            </div>
        </div>
    );


}