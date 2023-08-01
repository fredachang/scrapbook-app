import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../queryKeys";
import { useAuthContext } from "../../context/AuthContext";
import { apiUrl } from "../apiUrl";

interface Variables {
  imagePath: string;
  channelId: string;
}

const createBlock = async (
  variables: Variables,
  token?: string
): Promise<string> => {
  const data = await fetch(`${apiUrl}/blocks/create`, {
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

export const useCreateBlock = () => {
  const { authToken } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation<string, Error, Variables>(
    (variables) => createBlock(variables, authToken),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          queryKeys.connections.getConnections
        );
      },
    }
  );
};
