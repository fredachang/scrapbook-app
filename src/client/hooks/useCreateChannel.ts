import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../context/AuthContext";

interface Variables {
  title: string;
  is_private: boolean;
}

const createChannel = async (
  variables: Variables,
  token?: string
): Promise<string> => {
  const data = await fetch("http://localhost:4000/channels/create", {
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

export const useCreateChannel = () => {
  const { authToken } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation<string, Error, Variables>(
    (variables) => createChannel(variables, authToken),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("channels");
      },
    }
  );
};
