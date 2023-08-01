import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../context/AuthContext";
import { queryKeys } from "../queryKeys";
import { apiUrl } from "../apiUrl";

interface Variables {
  title: string;
  isPrivate: boolean;
  channelId: string;
}

const updateChannel = async (
  variables: Variables,
  token?: string
): Promise<string> => {
  const data = await fetch(`${apiUrl}/channel/update`, {
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

export const useUpdateChannel = () => {
  const { authToken } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation<string, Error, Variables>(
    (variables) => updateChannel(variables, authToken),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKeys.channels.getChannels);
      },
    }
  );
};
