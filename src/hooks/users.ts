import { fetchUser } from "../actions/users";
import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { User } from "../utils/types";

export function useGetUser(id: string): QueryObserverResult<Partial<User>> {
  return useQuery<Partial<User>>({
    queryFn: async () => {
      const result = await fetchUser(id);
      if (!result) {
        throw new Error(`Failed to fetch user with id: ${id}`);
      }
      return result;
    },
    queryKey: ["user", id],
  });
}
