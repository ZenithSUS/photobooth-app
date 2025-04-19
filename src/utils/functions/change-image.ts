import { toast } from "react-toastify";
import {
  databases,
  account,
  storage,
  DATABASE_ID,
  USER_COLLECTION_ID,
  BUCKET_ID,
  ENDPOINT as endpointUrl,
  PROJECT_ID as projectId,
} from "../../appwrite";
import { ID, Permission, Role } from "appwrite";
import { v4 as uuidv4 } from "uuid";
import { ErrorType } from "../types";

export default async function changeImage(image: File) {
  try {
    if (!image) return toast.error("Please select an image");
    const userID = JSON.parse(localStorage.getItem("id") as string);
    const profile = await account.getPrefs();

    if (profile.imageUrl !== "N/A" && profile.imageId !== "N/A") {
      await storage.deleteFile(BUCKET_ID, profile.imageId as string);
    }

    const imageFile = new File(
      [image],
      "zenithbooth_profile_" + uuidv4() + ".jpg",
      {
        type: "image/jpeg",
      },
    );

    const uploadedFile = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      imageFile,
      [Permission.read(Role.any()), Permission.write(Role.user(userID))],
    );
    const imageUrl = `${endpointUrl}/storage/buckets/${uploadedFile.bucketId}/files/${uploadedFile.$id}/view?project=${projectId}&mode=admin`;

    await account.updatePrefs({ imageUrl, imageId: uploadedFile.$id });
    await databases.updateDocument(DATABASE_ID, USER_COLLECTION_ID, userID, {
      profileImage: imageUrl,
      profileId: uploadedFile.$id,
    });

    toast.success("Image changed successfully");
    return window.location.reload();
  } catch (error) {
    const err = error as ErrorType;
    if (err.code === 404) {
      toast.error(err.message);
      return;
    }
    toast.error("Something went wrong");
    console.error(error);
  }
}
