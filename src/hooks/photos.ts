import {
  fetchAllPhotos,
  fetchPhoto,
  fetchPhotosByUser,
} from "../actions/photos";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { ShowPhotos } from "../utils/types";

export const useGetAllPhotos = (): QueryObserverResult<ShowPhotos[]> => {
  return useQuery<ShowPhotos[]>({
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

export const useGetAllPhotosByUser = (
  userID: string,
): QueryObserverResult<ShowPhotos[]> =>
  useQuery<ShowPhotos[]>({
    queryFn: async () => {
      const result = await fetchPhotosByUser(userID);
      if (!result) {
        throw new Error(`Failed to fetch photos for user: ${userID}`);
      }
      return result;
    },
    queryKey: ["photos", userID],
  });

export const useGetPhoto = (
  id: string,
): QueryObserverResult<Partial<ShowPhotos>> => {
  return useQuery<Partial<ShowPhotos>>({
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
