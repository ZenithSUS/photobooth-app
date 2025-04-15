import {
  createVote,
  getAllVotes,
  getVote,
  deleteVote,
  updateVote,
} from "../actions/votes";
import {
  useQuery,
  useMutation,
  UseBaseMutationResult,
  QueryObserverResult,
  useQueryClient,
} from "@tanstack/react-query";
import { Models } from "appwrite";
import { CreateVote, ShowVote, UpdateVote } from "../utils/types";

export const useCreateVote = (): UseBaseMutationResult<
  Models.Document,
  unknown,
  CreateVote,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateVote) => {
      const response = await createVote(data);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vote"] }),
    onError: (error) => {
      throw error;
    },
  });
};

export const useGetAllVotes = (): QueryObserverResult<ShowVote[]> => {
  return useQuery<ShowVote[]>({
    queryFn: async () => {
      const response = await getAllVotes();
      return response;
    },
    queryKey: ["vote"],
  });
};

export const useGetVoteByPhoto = (
  photoID: string,
  userID: string,
): QueryObserverResult<ShowVote[]> => {
  return useQuery<ShowVote[]>({
    queryFn: async () => {
      const response = await getVote(photoID, userID);
      return response;
    },
    queryKey: ["vote"],
  });
};

export const useUpdateVote = (): UseBaseMutationResult<
  Models.Document,
  unknown,
  UpdateVote,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ documentID, voteType }: UpdateVote) => {
      const response = await updateVote(documentID, voteType);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vote"] }),
    onError: (error) => {
      throw error;
    },
  });
};

export const useDeleteVote = (): UseBaseMutationResult<
  {},
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (documentID: string) => {
      const response = await deleteVote(documentID);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vote"] }),
    onError: (error) => {
      throw error;
    },
  });
};
