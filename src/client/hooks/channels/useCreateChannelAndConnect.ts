import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../context/AuthContext";
import { queryKeys } from "../queryKeys";
import { apiUrl } from "../../apiUrl";

interface Variables {
  title: string;
  isPrivate: boolean;
  blockId: string;
}

const createChannelAndConnection = async (
  variables: Variables,
  token?: string
): Promise<string> => {
  const data = await fetch(`${apiUrl}/createchannelandconnect`, {
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

export const useCreateChannelAndConnection = () => {
  const { authToken } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation<string, Error, Variables>(
    (variables) => createChannelAndConnection(variables, authToken),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKeys.channels.getChannels);
      },
    }
  );
};
