import { createSaved, fetchAllSaved } from "../actions/saved";
import {
  useQuery,
  useMutation,
  UseBaseMutationResult,
  QueryObserverResult,
  useQueryClient,
} from "@tanstack/react-query";
import { CreateSaved, ShowSaved as ShowSavedPhotos } from "../utils/types";
import { Models } from "appwrite";

export const useGetAllSavedPhoto = (
  userID: string,
): QueryObserverResult<ShowSavedPhotos[]> => {
  return useQuery<ShowSavedPhotos[]>({
    queryFn: async () => {
      const result = await fetchAllSaved(userID);
      if (!result) {
        throw new Error(`Failed to fetch photos for user: ${userID}`);
      }
      return result;
    },
    queryKey: ["saved", userID],
  });
};

export const useCreateSavedPhoto = (): UseBaseMutationResult<
  Models.Document,
  unknown,
  CreateSaved,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateSaved) => {
      const response = await createSaved(data);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["saved"] }),
    onError: (error) => {
      throw error;
    },
  });
};
