import { useQuery } from "react-query";
import { ConnectionWithImage } from "../../../common/types";
import { useAuthContext } from "../../context/AuthContext";
import { queryKeys } from "../queryKeys";

const getConnections = async (
  token?: string
): Promise<ConnectionWithImage[]> => {
  const data = await fetch("http://localhost:4000/user/channels/connections", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
  const res = await data.json();

  return res;
};

export const useGetConnections = () => {
  const { authToken } = useAuthContext();
  return useQuery<ConnectionWithImage[], Error>(
    queryKeys.connections.getConnections,
    () => getConnections(authToken)
  );
};
