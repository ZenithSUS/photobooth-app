import { updateExistingUser } from "../actions/users";
import { useMutation, UseBaseMutationResult } from "@tanstack/react-query";
import { UpdateUserProfile } from "../utils/types";

export const useUpdateUser = (): UseBaseMutationResult<UpdateUserProfile> => {
    return useMutation(updateExistingUser, {
        onSuccess: () => {},
    });
