import { useQuery } from "react-query";
import { useAuthContext } from "../../context/AuthContext";
import { Block } from "../../../common/types";
import { queryKeys } from "../queryKeys";
import { apiUrl } from "../../apiUrl";

const getBlocks = async (token?: string): Promise<Block[]> => {
  const data = await fetch(`${apiUrl}/user/blocks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
  const res = await data.json();

  return res;
};

export const useGetUserBlocks = () => {
  const { authToken } = useAuthContext();
  return useQuery<Block[], Error>(queryKeys.blocks.getBlocks, () =>
    getBlocks(authToken)
  );
};
