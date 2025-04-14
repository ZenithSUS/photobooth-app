import { createDownload, getAllDownloads } from "../appwrite/downloaded.ts";
import { CreateDownloaded } from "../utils/types";

export const createDownloaded = async (data: CreateDownloaded) => {
  try {
    return await createDownload(data);
  } catch (error) {
    throw error;
  }
};

export const fetchAllDownloaded = async (userID: string) => {
  try {
    return await getAllDownloads(userID);
  } catch (error) {
    throw error;
  }
};
