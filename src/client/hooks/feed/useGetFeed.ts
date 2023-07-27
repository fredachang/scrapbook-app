import { useQuery } from "react-query";
import { Connection, ConnectionWithImage } from "../../../common/types";
import { useAuthContext } from "../../context/AuthContext";
import { queryKeys } from "../queryKeys";

const getFeedConnections = async (
  token?: string
): Promise<ConnectionWithImage[]> => {
  const data = await fetch("http://localhost:4000/feed/connections", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
  const res = await data.json();

  return res;
};

export const useGetFeedConnections = () => {
  const { authToken } = useAuthContext();
  return useQuery<Connection[], Error>(queryKeys.social.getFeed, () =>
    getFeedConnections(authToken)
  );
};
