import { useMutation } from "react-query";
import { useAuthContext } from "../context/AuthContext";

interface Variables {
  image_path: string;
}

const createConnection = async (
  variables: Variables,
  token?: string
): Promise<string> => {
  const data = await fetch("http://localhost:4000/connections/create", {
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

export const useCreateConnection = () => {
  const { authToken } = useAuthContext();
  return useMutation<string, Error, Variables>((variables) =>
    createConnection(variables, authToken)
  );
};
