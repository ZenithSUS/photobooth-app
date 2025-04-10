import { fetchAllPhotos, fetchPhoto } from "../actions/photos";
import {
  QueryObserverResult,
  useQuery,
} from "@tanstack/react-query";
import { Photos } from "../utils/types";

export const getAllPhotos = (): QueryObserverResult<Photos[]> => {
  return useQuery<Photos[]>({
    queryFn: async () => {
      const result = await fetchAllPhotos();

      if (!result) {
        throw new Error("Failed to fetch photos");
      }
      return result;
    },
    queryKey: ["photos"],
  });
};

export const getPhoto = (id: string): QueryObserverResult<Partial<Photos>> => {
  return useQuery<Partial<Photos>>({
    queryFn: async () => {
      const result = await fetchPhoto(id);
      if (!result) {
        throw new Error(`Failed to fetch photo with id: ${id}`);
      }
      return result;
    },
    queryKey: ["photo", id],
  });
};