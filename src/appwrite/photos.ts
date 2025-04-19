import { databases, PHOTO_COLLECTION_ID, DATABASE_ID } from "./index.ts";
import { Query, ID, Permission, Role } from "appwrite";
import { ShowPhotos, CreatePhoto } from "../utils/types";

export const createNewPhoto = async (data: CreatePhoto) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      PHOTO_COLLECTION_ID,
      ID.unique(),
      data,
      [Permission.read(Role.any()), Permission.write(Role.user(data.userID))],
    );
  } catch (error) {
    console.error("Error creating photo document:", error);
    throw error;
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
          $permissions: doc.$permissions,
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
          imagesId: doc.imagesId,
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
          $permissions: doc.$permissions,
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
          imagesId: doc.imagesId,
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

export const deletePhoto = async (id: string) => {
  try {
    return await databases.deleteDocument(DATABASE_ID, PHOTO_COLLECTION_ID, id);
  } catch (error) {
    console.error("Error deleting photo:", error);
    throw error;
  }
};
