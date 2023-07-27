import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../context/AuthContext";
import { queryKeys } from "../queryKeys";

interface Variables {
  channelId: string;
  blockId: string;
}

const createConnection = async (
  variables: Variables,
  token?: string
): Promise<string> => {
  const data = await fetch("http://localhost:4000/connections/create", {
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

export const useCreateConnection = () => {
  const { authToken } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation<string, Error, Variables>(
    (variables) => createConnection(variables, authToken),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          queryKeys.connections.getConnections
        );
      },
    }
  );
};
