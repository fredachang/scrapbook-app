import React from "react";
import { useAuth } from "../hooks/user/useAuth";

type AuthContext = ReturnType<typeof useAuth>;

const AuthContext = React.createContext<AuthContext>({} as any);

export const AuthContextProvider = (props: React.PropsWithChildren<{}>) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuthContext: () => AuthContext = () =>
  React.useContext(AuthContext);
