import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../queryKeys";
import { useAuthContext } from "../../context/AuthContext";

interface Variables {
  blockId: string;
}

const deleteUserBlock = async (
  variables: Variables,
  token?: string
): Promise<string> => {
  const data = await fetch("http://localhost:4000/user/block/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    body: JSON.stringify(variables),
  });
  const res = await data.json();

  return res;
};

export const useDeleteUserBlock = () => {
  const { authToken } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation<string, Error, Variables>(
    (variables) => deleteUserBlock(variables, authToken),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          queryKeys.connections.getConnections
        );
        await queryClient.invalidateQueries(queryKeys.blocks.getBlocks);
      },
    }
  );
};
