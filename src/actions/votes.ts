import {
  createVote as AddVote,
  getAllVotes as fetchAllVotes,
  getVoteByID,
  updateVote as changeVote,
  deleteVote as removeVote,
} from "../appwrite/votes";
import { CreateVote } from "../utils/types";

export const createVote = async (data: CreateVote) => {
  try {
    return await AddVote(data);
  } catch (error) {
    throw error;
  }
};

export const getAllVotes = async () => {
  try {
    return await fetchAllVotes();
  } catch (error) {
    throw error;
  }
};

export const getVote = async (photoID: string, userID: string) => {
  try {
    return await getVoteByID(photoID, userID);
  } catch (error) {
    throw error;
  }
};

export const updateVote = async (documentID: string, voteType: string) => {
  try {
    return await changeVote(documentID, voteType);
  } catch (error) {
    throw error;
  }
};

export const deleteVote = async (documentID: string = "") => {
  try {
    return await removeVote(documentID);
  } catch (error) {
    throw error;
  }
};
