import { databases, USER_COLLECTION_ID, DATABASE_ID } from "./index.ts";
import { User } from "../utils/types.ts";
import { Query, Permission, Role } from "appwrite";

export const getAllUsers = async () => {
  let allusers: User[] = [];
  let offset = 0;
  const limit = 100;
  while (true) {
    const { documents } = await databases.listDocuments(
      DATABASE_ID,
      USER_COLLECTION_ID[(Query.limit(limit), Query.offset(offset))],
    );

    allusers = [
      ...allusers,
      ...documents.map((docs) => ({
        $id: docs.$id,
        $createdAt: docs.$createdAt,
        $updatedAt: docs.$updatedAt,
        name: docs.name,
        email: docs.email,
        profileImage: docs.profileImage,
      })),
    ];

    if (documents.length === 0) break;
    offset += limit;
  }

  return allusers;
};

export const getUser = async (id: string) => {
  try {
    const result = await databases.getDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      id,
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (data: Object, id: string) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      id,
      data,
      [Permission.read(Role.any()), Permission.write(Role.user(id))],
    );
  } catch (error) {
    console.error(error);
  }
};
