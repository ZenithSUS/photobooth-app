import { databases, PHOTO_COLLECTION_ID, DATABASE_ID } from "../appwrite";

export const createNewPhoto = async (urls: Object, id: string) => {
  try {
    await databases.createDocument(DATABASE_ID, PHOTO_COLLECTION_ID, id, urls);
  } catch (error) {
    console.log("Error creating photo document:", error);
  }
};
