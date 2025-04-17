import {
  createNewPhoto,
  getAllPhotos,
  getAllPhotosByUser,
  getPhoto,
  deletePhoto,
} from "../appwrite/photos";
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

export const fetchPhotosByUser = async (userID: string) => {
  try {
    return await getAllPhotosByUser(userID);
  } catch (error) {
    console.log("Error fetching photos by user:", error);
  }
};

export const fetchPhoto = async (id: string) => {
  try {
    return await getPhoto(id);
  } catch (error) {
    console.log("Error fetching photo:", error);
  }
};

export const removePhoto = async (id: string) => {
  try {
    return await deletePhoto(id);
  } catch (error) {
    console.log("Error deleting photo:", error);
  }
};
