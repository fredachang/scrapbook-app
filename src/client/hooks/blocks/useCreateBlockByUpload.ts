import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../context/AuthContext";
import { queryKeys } from "../queryKeys";
import { apiUrl } from "../apiUrl";

interface Variables {
  imageData: any;
  channelId: string;
}

const createBlockByUpload = async (
  variables: Variables,
  token?: string
): Promise<string> => {
  const data = await fetch(`${apiUrl}/http://localhost:4000/blocks/upload`, {
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

export const useCreateBlockByUpload = () => {
  const { authToken } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation<string, Error, Variables>(
    (variables) => createBlockByUpload(variables, authToken),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          queryKeys.connections.getConnections
        );
      },
    }
  );
};
