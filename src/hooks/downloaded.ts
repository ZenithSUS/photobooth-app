import { createDownloaded, fetchAllDownloaded } from "../actions/downloaded";
import {
  useQueryClient,
  useQuery,
  useMutation,
  QueryObserverResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { ShowDownloaded, CreateDownloaded } from "../utils/types";
import { Models } from "appwrite";

export const useGetAllDownloaded = (
  userID: string,
): QueryObserverResult<ShowDownloaded[]> => {
  return useQuery<ShowDownloaded[]>({
    queryFn: async () => {
      const result = await fetchAllDownloaded(userID);
      if (!result) {
        throw new Error(`Failed to fetch downloads for user: ${userID}`);
      }
      return result;
    },
    queryKey: ["downloaded", userID],
  });
};

export const useCreateDownloaded = (): UseMutationResult<
  unknown,
  Models.Document,
  CreateDownloaded,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateDownloaded) => {
      const response = await createDownloaded(data);
      return response;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["downloaded"] }),
    onError: (error) => {
      throw error;
    },
  });
};
