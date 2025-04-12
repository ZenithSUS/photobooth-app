import { createSharedPhoto, getSharedPhotos } from "../appwrite/shared";

export const sharePhoto = async (userID: string, photoID: string) => {
  try {
    await createSharedPhoto(userID, photoID);
  } catch (error) {
    console.log(error);
  }
};

export const fetchSharedPhotos = async (userID: string) => {
  try {
    return await getSharedPhotos(userID);
  } catch (error) {
    console.log(error);
  }
};
