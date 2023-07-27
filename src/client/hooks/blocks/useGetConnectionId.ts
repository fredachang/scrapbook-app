import { useQuery } from "react-query";
import { useAuthContext } from "../../context/AuthContext";
import { queryKeys } from "../queryKeys";

interface Variables {
  blockId: string;
  channelId: string;
}

const getConnectionId = async (
  variables: Variables,
  token?: string
): Promise<string> => {
  const { blockId, channelId } = variables;
  const url = `http://localhost:4000/user/block/connectionid/${blockId}/${channelId}`;

  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
  const res = await data.json();

  return res;
};

export const useGetConnectionId = (variables: Variables) => {
  const { authToken } = useAuthContext();

  // Create a unique query key based on the blockId and channelId
  const queryKey =
    queryKeys.connections.getConnectionId + JSON.stringify(variables);

  return useQuery<string, Error, string>(queryKey, () =>
    getConnectionId(variables, authToken)
  );
};
