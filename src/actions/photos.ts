import { createNewPhoto, getAllPhotos, getPhoto } from "../appwrite/photos";
import { CreatePhoto } from "../utils/types";

export const createPhoto = async (data: CreatePhoto) => {
  try {
    return await createNewPhoto(data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllPhotos = async () => {
  try {
    return await getAllPhotos();
  } catch (error) {
    console.log("Error fetching photos:", error);
  }
};

export const fetchPhoto = async (id: string) => {
  try {
    return await getPhoto(id);
  } catch (error) {
    console.log("Error fetching photo:", error);
  }
};
