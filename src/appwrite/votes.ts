import { databases, DATABASE_ID, VOTE_COLLECTION_ID } from "./index.ts";
import { Query, ID } from "appwrite";
import { CreateVote, ShowVote } from "../utils/types.ts";

export const createVote = async (data: CreateVote) => {
  try {
    console.log(data);
    return await databases.createDocument(
      DATABASE_ID,
      VOTE_COLLECTION_ID,
      ID.unique(),
      data,
    );
  } catch (error) {
    throw error;
  }
};

export const getAllVotes = async () => {
  try {
    let allVotes = [] as ShowVote[];
    let offset = 0;
    const limit = 100;

    while (true) {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        VOTE_COLLECTION_ID,
        [Query.limit(limit), Query.offset(offset)],
      );

      allVotes = [
        ...allVotes,
        ...documents.map((docs) => ({
          $id: docs.$id,
          $createdAt: docs.$createdAt,
          $updatedAt: docs.$updatedAt,
          user: docs.user,
          photo: docs.photo,
          voteType: docs.voteType,
        })),
      ];

      if (documents.length < limit) break;

      offset += limit;
    }

    return allVotes;
  } catch (error) {
    throw error;
  }
};

export const getVoteByID = async (photoID: string, userID: string) => {
  try {
    let allVotes = [] as ShowVote[];
    let offset = 0;
    const limit = 100;

    while (true) {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        VOTE_COLLECTION_ID,
        [
          Query.limit(limit),
          Query.offset(offset),
          Query.and([
            Query.equal("photo", photoID),
            Query.equal("user", userID),
          ]),
        ],
      );

      allVotes = [
        ...allVotes,
        ...documents.map((docs) => ({
          $id: docs.$id,
          $createdAt: docs.$createdAt,
          $updatedAt: docs.$updatedAt,
          user: docs.user,
          photo: docs.photo,
          voteType: docs.voteType,
        })),
      ];

      if (documents.length < limit) break;
      offset += limit;
    }
    return allVotes;
  } catch (error) {
    throw error;
  }
};

export const updateVote = async (documentID: string, voteType: string) => {
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      VOTE_COLLECTION_ID,
      documentID,
      { voteType: voteType },
    );
  } catch (error) {
    throw error;
  }
};

export const deleteVote = async (documentID: string) => {
  try {
    return await databases.deleteDocument(
      DATABASE_ID,
      VOTE_COLLECTION_ID,
      documentID,
    );
  } catch (error) {
    throw error;
  }
};
