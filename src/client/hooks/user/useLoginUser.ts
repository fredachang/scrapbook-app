import { useMutation } from "react-query";
import { apiUrl } from "../apiUrl";

interface Variables {
  email: string;
  password: string;
}

type JWT = string;

const login = async (variables: Variables): Promise<JWT> => {
  const data = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(variables),
  });
  const res = await data.json();

  return res;
};

export const useLoginUser = () => {
  return useMutation<JWT, Error, Variables>(login);
};
