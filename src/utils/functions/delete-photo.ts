import { toast } from "react-toastify";
import { storage, BUCKET_ID } from "../../appwrite";

export default function deletePhotos(imagesId: string[]) {
  try {
    Promise.all(
      imagesId.map((imageId) => storage.deleteFile(BUCKET_ID, imageId)),
    );
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
      console.error("Error deleting photo", error);
    }
  }
}
