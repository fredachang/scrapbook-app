import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../queryKeys";
import { useAuthContext } from "../../context/AuthContext";
import { apiUrl } from "../../apiUrl";

interface Variables {
  text: string;
  channelId: string;
}

const createBlockWithText = async (
  variables: Variables,
  token?: string
): Promise<string> => {
  const data = await fetch(`${apiUrl}/blocks/createtext`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    body: JSON.stringify(variables),
  });
  const res = await data.json();

  return res;
};

export const useCreateBlockWithText = () => {
  const { authToken } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation<string, Error, Variables>(
    (variables) => createBlockWithText(variables, authToken),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          queryKeys.connections.getConnections
        );
      },
    }
  );
};
