import React from "react";
import { useLocalStorage } from "react-use";
import { useLoginUser } from "./useLoginUser";
import { useSignupUser } from "./useSignupUser";
import decode from "jwt-decode";

interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

type LoginRequest = Pick<SignupRequest, "email" | "password">;

interface JwtBody {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    created: Date;
  };
  exp: number;
}

export const useAuth = () => {
  const [token, setToken, remove] = useLocalStorage<string | undefined>("auth");

  const signupUserMutation = useSignupUser();
  const loginUserMutation = useLoginUser();

  const loginAsync = (request: LoginRequest) => {
    console.log("in loginAsync");
    return loginUserMutation.mutateAsync(request).then((jwt) => {
      console.log({ jwt });
      setToken(jwt);
    });
  };

  const login = {
    ...loginUserMutation,
    loginAsync,
  };

  const logout = React.useCallback(() => remove(), [remove]);

  const profile = React.useMemo(() => {
    if (!token) {
      return null;
    }

    const payload = decode<JwtBody>(token);
    return payload.user;
  }, [token]);

  const isAuthenticated = React.useCallback(() => {
    if (!token) {
      return false;
    }

    const payload = decode<JwtBody>(token);
    const now = new Date().valueOf() / 1000;

    // if the tokens expiry > then current date, token is valid
    const isAuthed = payload.exp > now;
    return isAuthed;
  }, [token]);

  return {
    signup: signupUserMutation,
    login,
    logout,
    isAuthenticated,
    authToken: token,
    profile,
  };
};
