import { fetchAllPhotos, fetchPhoto } from "../actions/photos";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { ShowPhotos } from "../utils/types";

export const getAllPhotos = (): QueryObserverResult<ShowPhotos[]> => {
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

export const getPhoto = (
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
