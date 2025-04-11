import { databases, USER_COLLECTION_ID, DATABASE_ID } from "./index.ts";
import { Query } from "appwrite";

export const getAllUsers = async () => {
  let allusers: Object[] = [];
  let offset = 0;
  const limit = 100;
  while (true) {
    const { documents } = await databases.listDocuments(
      DATABASE_ID,
      USER_COLLECTION_ID[(Query.limit(limit), Query.offset(offset))],
    );

    allusers = [...allusers, ...documents];

    if (documents.length === 0) break;
    offset += limit;
  }

  return allusers;
};

export const getUser = async (id: string) => {
  try {
    await databases.getDocument(DATABASE_ID, USER_COLLECTION_ID, id);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (data: Object, id: string) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      id,
      data,
    );
  } catch (error) {
    console.log(error);
  }
};
