import { createSavedPhoto, getAllSavedPhoto } from "../appwrite/saved.ts";
import { CreateSaved } from "../utils/types";

export const createSaved = async (data: CreateSaved) => {
  try {
    const response = await createSavedPhoto(data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllSaved = async (userID: string) => {
  try {
    return await getAllSavedPhoto(userID);
  } catch (error) {
    console.error(error);
  }
};
