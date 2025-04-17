import { createUser, getUser } from "../appwrite/users";

export const createNewUser = async (data: Object, id: string) => {
  try {
    await createUser(data, id);
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async (id: string) => {
  try {
    return await getUser(id);
  } catch (error) {
    throw error;
  }
};

export default { createNewUser, fetchUser };
