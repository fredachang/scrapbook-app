import { useQuery } from "react-query";
import { useAuthContext } from "../context/AuthContext";
import { Channel } from "../../common/types";

type Channels = Channel[];

const getChannels = async (token?: string): Promise<Channels> => {
  const data = await fetch("http://localhost:4000/user/channels", {
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
  return useQuery<Channels, Error>("channels", () => getChannels(authToken));
};
