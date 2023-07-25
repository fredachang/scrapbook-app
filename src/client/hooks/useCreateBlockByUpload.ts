import { useMutation } from "react-query";
import { useAuthContext } from "../context/AuthContext";

interface Variables {
  image_data: string | ArrayBuffer | null;
  channelId: string;
}

const createBlockByUpload = async (
  variables: Variables,
  token?: string
): Promise<string> => {
  const data = await fetch("http://localhost:4000/blocks/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    body: JSON.stringify(variables),
  });
  const res = await data.json();

  return res;
};

export const useCreateBlockByUpload = () => {
  const { authToken } = useAuthContext();

  return useMutation<string, Error, Variables>((variables) =>
    createBlockByUpload(variables, authToken)
  );
};
