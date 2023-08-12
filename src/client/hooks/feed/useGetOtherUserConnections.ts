import { useQuery } from "react-query";
import { ConnectionWithImage } from "../../../common/types";
import { useAuthContext } from "../../context/AuthContext";
import { queryKeys } from "../queryKeys";
import { apiUrl } from "../../apiUrl";

const getOtherUserConnections = async (
  userId: string,
  token?: string
): Promise<ConnectionWithImage[]> => {
  const data = await fetch(`${apiUrl}/${userId}/connections`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
  const res = await data.json();

  return res;
};

export const useGetOtherUserConnections = (userId: string) => {
  const { authToken } = useAuthContext();
  return useQuery<ConnectionWithImage[], Error>(
    queryKeys.social.getOtherConnections,
    () => getOtherUserConnections(userId, authToken)
  );
};
