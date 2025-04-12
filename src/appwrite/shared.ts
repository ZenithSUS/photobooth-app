import { databases, SHARED_COLLECTION_ID, DATABASE_ID } from "./index.ts";
import { Query, ID } from "appwrite";
import { SharedPhotos } from "../utils/types.ts";

export const createSharedPhoto = async (userID: string, photoID: string) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      SHARED_COLLECTION_ID,
      ID.unique(),
      {
        userID: userID,
        photoID: photoID,
      },
    );
  } catch (error) {
    console.log("Error creating photo document:", error);
  }
};

export const getSharedPhotos = async (userID: string) => {
  try {
    let allsharedphotos: SharedPhotos[] = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        SHARED_COLLECTION_ID,
        [
          Query.limit(limit),
          Query.offset(offset),
          Query.equal("userID", userID),
        ],
      );

      allsharedphotos = [
        ...allsharedphotos,
        ...documents.map((doc) => ({
          $id: doc.$id,
          userID: doc.userID,
          photoID: doc.photoID,
        })),
      ];

      if (documents.length === 0) break;
      offset += limit;
    }

    return allsharedphotos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};
