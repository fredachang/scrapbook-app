import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../queryKeys";
import { useAuthContext } from "../../context/AuthContext";
import { apiUrl } from "../../apiUrl";

interface Variables {
  connectionId: string;
  blockId: string;
}

const deleteConnection = async (
  variables: Variables,
  token?: string
): Promise<string> => {
  const { connectionId, blockId } = variables;
  const data = await fetch(
    `${apiUrl}/user/connection/delete/${connectionId}/${blockId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    }
  );
  const res = await data.json();

  return res;
};

export const useDeleteConnection = () => {
  const { authToken } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation<string, Error, Variables>(
    (variables) => deleteConnection(variables, authToken),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          queryKeys.connections.getConnections
        );
      },
    }
  );
};
