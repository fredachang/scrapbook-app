import { useMutation } from "react-query";
import { apiUrl } from "../../apiUrl";

interface Variables {
  email: string;
  password: string;
}

type JWT = string;

const login = async (variables: Variables): Promise<JWT> => {
  try {
    const data = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variables),
    });

    const res = await data.json();

    if (!data.ok) {
      throw new Error(res);
    }

    return res;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Unknown error");
  }
};

export const useLoginUser = () => {
  return useMutation<JWT, Error, Variables>(login);
};
