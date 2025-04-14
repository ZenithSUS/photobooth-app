import { createUser } from "../appwrite/users";

export const createNewUser = async (data: Object, id: string) => {
  try {
    await createUser(data, id);
  } catch (error) {
    throw error;
  }
};
