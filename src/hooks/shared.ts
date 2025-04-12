import { fetchSharedPhotos } from "../actions/shared";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { SharedPhotos } from "../utils/types";

export const getSharedPhotos = (
  id: string,
): QueryObserverResult<SharedPhotos[]> => {
  return useQuery<SharedPhotos[]>({
    queryFn: async () => {
      const result = await fetchSharedPhotos(id);
      if (!result) {
        throw new Error("Failed to fetch shared photos");
      }
      return result;
    },
    queryKey: ["sharedPhotos"],
  });
};
