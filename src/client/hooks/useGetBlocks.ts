import { useQuery } from "react-query";
import { useAuthContext } from "../context/AuthContext";

type Block = {
  block_id: string;
  image_path: string;
};

type Blocks = Block[];

const getBlocks = async (token?: string): Promise<Blocks> => {
  const data = await fetch("http://localhost:4000/blocks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
  const res = await data.json();

  return res;
};

export const useGetBlocks = () => {
  const { authToken } = useAuthContext();
  return useQuery<Blocks, Error>("blocks", () => getBlocks(authToken));
};
