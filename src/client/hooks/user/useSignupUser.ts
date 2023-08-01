import { useMutation } from "react-query";
import { apiUrl } from "../apiUrl";

interface Variables {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const signup = async (variables: Variables): Promise<string> => {
  const data = await fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(variables),
  });
  const res = await data.json();

  return res;
};

export const useSignupUser = () => {
  return useMutation<string, Error, Variables>(signup);
};
