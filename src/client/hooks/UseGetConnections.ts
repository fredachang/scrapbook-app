import { useQuery } from "react-query";
import { useAuthContext } from "../context/AuthContext";
import { Connection } from "../../common/types";
import { queryKeys } from "./queryKeys";

const getConnections = async (token?: string): Promise<Connection[]> => {
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
  return useQuery<Connection[], Error>(
    queryKeys.connections.getConnections,
    () => getConnections(authToken)
  );
};
