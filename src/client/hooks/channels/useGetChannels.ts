import { useQuery } from "react-query";
import { useAuthContext } from "../../context/AuthContext";
import { queryKeys } from "../queryKeys";
import { Channel } from "../../../common/types";
import { apiUrl } from "../../apiUrl";

type Channels = Channel[];

const getChannels = async (token?: string): Promise<Channels> => {
  const data = await fetch(`${apiUrl}/user/channels`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
  const res = await data.json();

  return res;
};

export const useGetChannels = () => {
  const { authToken } = useAuthContext();
  return useQuery<Channels, Error>(queryKeys.channels.getChannels, () =>
    getChannels(authToken)
  );
};
