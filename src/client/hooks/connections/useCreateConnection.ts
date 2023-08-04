import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../context/AuthContext";
import { queryKeys } from "../queryKeys";
import { apiUrl } from "../../apiUrl";

interface Variables {
  channelId: string;
  blockId: string;
}

const createConnection = async (
  variables: Variables,
  token?: string
): Promise<string> => {
  const data = await fetch(`${apiUrl}/connections/create`, {
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

export const useCreateConnection = (blockId: string) => {
  const { authToken } = useAuthContext();
  const queryClient = useQueryClient();

  const queryKey = `${queryKeys.blocks.getChannels}-${blockId}`;

  return useMutation<string, Error, Variables>(
    (variables) => createConnection(variables, authToken),
    {
      onSuccess: () =>
        Promise.all([
          queryClient.invalidateQueries(queryKeys.connections.getConnections),
          queryClient.invalidateQueries(queryKey),
        ]),
    }
  );
};
