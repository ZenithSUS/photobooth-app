import {
  fetchAllPhotos,
  fetchPhoto,
  fetchPhotosByUser,
  removePhoto,
} from "../actions/photos";
import {
  useQueryClient,
  QueryObserverResult,
  useQuery,
  useMutation,
  UseBaseMutationResult,
} from "@tanstack/react-query";
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

export const useDeletePhoto = (
  id: string,
): UseBaseMutationResult<{} | undefined, unknown, string, unknown> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await removePhoto(id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
