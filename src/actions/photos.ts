import { createNewPhoto } from "../appwrite/photos";
import { Images } from "../utils/types";

export const createPhoto = async (data: Images, id: string) => {
  try {
    return await createNewPhoto(data, id);
  } catch (error) {
    console.log(error);
  }
};
