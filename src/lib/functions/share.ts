import { v4 as uuidv4 } from "uuid";
import { createPhoto } from "../../actions/photos.ts";
import {
  ENDPOINT as endpointUrl,
  PROJECT_ID as projectId,
  storage,
  BUCKET_ID,
} from "../../appwrite/index.ts";
import { ID } from "appwrite";
import { toast } from "react-toastify";

export default async function shareImages(
  capturedImage: Blob[],
  setCapturedImage: (images: Blob[]) => void
) {
  try {
    if (capturedImage.length === 3) {
      if (!window.confirm("Are you sure you want to share?")) return;

      const jpegFiles = capturedImage.map((blob, index) => {
        const uniqueFilename = `photo_${index + 1}_${uuidv4()}.jpeg`;
        const file = new File([blob as Blob], uniqueFilename, {
          type: "image/jpeg",
        });
        return file;
      });

      const images = {
        image1: jpegFiles[0],
        image2: jpegFiles[1],
        image3: jpegFiles[2],
      };

      const file1 = new File([images.image1], "image1.jpg", {
        type: "image/jpeg",
      });
      const file2 = new File([images.image2], "image2.jpg", {
        type: "image/jpeg",
      });
      const file3 = new File([images.image3], "image3.jpg", {
        type: "image/jpeg",
      });

      const imageData1 = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file1
      );
      const imageData2 = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file2
      );
      const imageData3 = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file3
      );

      createPhoto(
        {
          userID: JSON.parse(localStorage.getItem("id") || '""') as string,
          image1Url: `${endpointUrl}/storage/buckets/${imageData1.bucketId}/files/${imageData1.$id}/view?project=${projectId}&mode=admin`,
          image2Url: `${endpointUrl}/storage/buckets/${imageData2.bucketId}/files/${imageData2.$id}/view?project=${projectId}&mode=admin`,
          image3Url: `${endpointUrl}/storage/buckets/${imageData3.bucketId}/files/${imageData3.$id}/view?project=${projectId}&mode=admin`,
        },
        JSON.parse(localStorage.getItem("id") || '""') as string
      );

      setCapturedImage([]);
      toast.success("Images shared successfully!");
    }
  } catch (error) {
    console.log(error);
    toast.error("There was an error sharing images");
  }
}
