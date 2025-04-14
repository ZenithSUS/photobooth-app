import { databases, DATABASE_ID, DOWNLOADED_COLLECTION_ID } from "./index.ts";
import { Downloaded, CreateDownloaded } from "../utils/types.ts";
import { Query, ID } from "appwrite";

export const createDownload = async (data: CreateDownloaded) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      DOWNLOADED_COLLECTION_ID,
      ID.unique(),
      data,
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllDownloads = async (userID: string) => {
  try {
    let allDownloads = [] as Downloaded[];
    let offset = 0;
    const limit = 100;

    while (true) {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        DOWNLOADED_COLLECTION_ID,
        [
          Query.limit(limit),
          Query.offset(offset),
          Query.equal("userID", userID),
        ],
      );

      allDownloads = [
        ...allDownloads,
        ...documents.map((docs) => ({
          $id: docs.$id,
          $createdAt: docs.$createdAt,
          $updatedAt: docs.$updatedAt,
          photoID: docs.photoID,
          userID: docs.userID,
        })),
      ];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
