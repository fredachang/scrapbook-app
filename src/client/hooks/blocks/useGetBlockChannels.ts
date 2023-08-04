import { useQuery } from "react-query";
import { useAuthContext } from "../../context/AuthContext";
import { queryKeys } from "../queryKeys";
import { Channel } from "../../../common/types";
import { apiUrl } from "../../apiUrl";

const getBlockChannels = async (
  blockId: string,
  token?: string
): Promise<Channel[]> => {
  const url = `${apiUrl}/user/${blockId}/channels`;

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

  const queryKey = `${queryKeys.blocks.getChannels}-${blockId}`;

  return useQuery<Channel[], Error>(queryKey, () =>
    getBlockChannels(blockId, authToken)
  );
};
