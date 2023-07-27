import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../queryKeys";
import { useAuthContext } from "../../context/AuthContext";

interface Variables {
  channelId: string;
}

const deleteChannel = async (
  variables: Variables,
  token?: string
): Promise<string> => {
  const data = await fetch("http://localhost:4000/user/channel/delete", {
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

export const useDeleteChannel = () => {
  const { authToken } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation<string, Error, Variables>(
    (variables) => deleteChannel(variables, authToken),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKeys.channels.getChannels);
      },
    }
  );
};
