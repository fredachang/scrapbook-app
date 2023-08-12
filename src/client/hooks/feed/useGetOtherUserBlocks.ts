import { useQuery } from "react-query";
import { useAuthContext } from "../../context/AuthContext";
import { queryKeys } from "../queryKeys";
import { Block } from "../../../common/types";
import { apiUrl } from "../../apiUrl";

const getOtherUseBlocks = async (
  userId: string,
  token?: string
): Promise<Block[]> => {
  const data = await fetch(`${apiUrl}/${userId}/blocks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
  const res = await data.json();

  return res;
};

export const useGetOtherUserBlocks = (userId: string) => {
  const { authToken } = useAuthContext();
  return useQuery<Block[], Error>(queryKeys.social.getOtherBlocks, () =>
    getOtherUseBlocks(userId, authToken)
  );
};
