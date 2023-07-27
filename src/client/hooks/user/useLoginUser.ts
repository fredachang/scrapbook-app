import { useMutation } from "react-query";

interface Variables {
  email: string;
  password: string;
}

type JWT = string;

const login = async (variables: Variables): Promise<JWT> => {
  const data = await fetch("http://localhost:4000/auth/login", {
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
