import { databases, SAVED_COLLECTION_ID, DATABASE_ID } from "./index.ts";
import { Query, ID } from "appwrite";
import { CreateSaved, ShowSaved as ShowSavedPhotos } from "../utils/types.ts";

export const createSavedPhoto = async (data: CreateSaved) => {
  try {
    const { documents } = await databases.listDocuments(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      [Query.equal("photoID", [data.photoID])],
    );

    if (documents.length > 0) {
      throw new Error("Photo Already Saved");
    }

    return await databases.createDocument(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      ID.unique(),
      data,
    );
  } catch (error) {
    throw error;
  }
};

export const getAllSavedPhoto = async (userID: string) => {
  try {
    let allSavedPhotos: ShowSavedPhotos[] = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        SAVED_COLLECTION_ID,
        [
          Query.equal("userID", userID),
          Query.limit(limit),
          Query.offset(offset),
        ],
      );

      allSavedPhotos = [
        ...allSavedPhotos,
        ...documents.map((doc) => ({
          $id: doc.$id,
          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
          userID: doc.userID,
          photoID: doc.photoID,
        })),
      ];

      if (documents.length < limit) break;

      offset += limit;
    }
    return allSavedPhotos;
  } catch (error) {
    console.error("Error fetching saved photos:", error);
    return [];
  }
};
