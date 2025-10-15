import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "universal-cookie";

type AuthType = {
  token: string;
  username: string;
  email?: string;
};

type UserType = {
  auth: AuthType;
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
};

export const User = createContext<UserType>({
  auth: { token: "", username: "", email: "" },
  setAuth: () => {},
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState<AuthType>({
    token: "",
    username: "",
    email: "",
  });

  return <User.Provider value={{ auth, setAuth }}>{children}</User.Provider>;
}
