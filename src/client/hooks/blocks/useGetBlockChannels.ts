import { useQuery } from "react-query";
import { useAuthContext } from "../../context/AuthContext";
import { queryKeys } from "../queryKeys";
import { Channel } from "../../../common/types";

const getBlockChannels = async (
  blockId: string,
  token?: string
): Promise<Channel[]> => {
  const url = `http://localhost:4000/user/${blockId}/channels`;

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

export const useGetBlockChannels = (blockId: string) => {
  const { authToken } = useAuthContext();

  const queryKey = queryKeys.blocks.getChannels + JSON.stringify(blockId);

  return useQuery<Channel[], Error>(queryKey, () =>
    getBlockChannels(blockId, authToken)
  );
};
