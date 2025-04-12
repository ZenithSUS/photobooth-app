import { databases, PHOTO_COLLECTION_ID, DATABASE_ID } from "./index.ts";
import { Query, ID } from "appwrite";
import { ShowPhotos } from "../utils/types";

export const createNewPhoto = async (urls: Object) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      PHOTO_COLLECTION_ID,
      ID.unique(),
      urls,
    );
  } catch (error) {
    console.log("Error creating photo document:", error);
  }
};

export const getAllPhotos = async () => {
  try {
    let allPhotos: ShowPhotos[] = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        PHOTO_COLLECTION_ID,
        [Query.limit(limit), Query.offset(offset)],
      );

      allPhotos = [
        ...allPhotos,
        ...documents.map((doc) => ({
          $id: doc.$id,
          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
          userID: doc.userID,
          title: doc.title,
          author: doc.author,
          sticker: doc.sticker,
          border: doc.border,
          background: doc.background,
          filters: doc.filters,
          image1Url: doc.image1Url,
          image2Url: doc.image2Url,
          image3Url: doc.image3Url,
        })),
      ];

      if (documents.length === 0) break;

      offset += limit;
    }

    return allPhotos;
  } catch (error) {
    console.error("Error fetching all photos:", error);
    return [];
  }
};

export const getAllPhotosByUser = async (userID: string) => {
  try {
    let allPhotos: ShowPhotos[] = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        PHOTO_COLLECTION_ID,
        [
          Query.limit(limit),
          Query.offset(offset),
          Query.equal("userID", userID),
        ],
      );

      allPhotos = [
        ...allPhotos,
        ...documents.map((doc) => ({
          $id: doc.$id,
          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
          userID: doc.userID,
          title: doc.title,
          author: doc.author,
          sticker: doc.sticker,
          border: doc.border,
          background: doc.background,
          filters: doc.filters,
          image1Url: doc.image1Url,
          image2Url: doc.image2Url,
          image3Url: doc.image3Url,
        })),
      ];

      if (documents.length === 0) break;

      offset += limit;
    }

    return allPhotos;
  } catch (error) {
    console.error("Error fetching photos by user:", error);
    return [];
  }
};

export const getPhoto = async (id: string) => {
  try {
    const result = await databases.getDocument(
      DATABASE_ID,
      PHOTO_COLLECTION_ID,
      id,
    );

    return result;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};
