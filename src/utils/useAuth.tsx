import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { Account } from "@/types";

export const AuthContext = createContext<{
  isUserAuthenticated: boolean;
  user: Account | null;
  login: Function;
  logout: Function;
}>({
  isUserAuthenticated: false,
  user: null,
  login: (user: Object) => {},
  logout: () => {},
});

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Object | null>(null);

  useEffect(() => {
    let token = Cookies.get("access_token");

    if (token) {
      try {
        let tokenDecoded = jwt.verify(token, "secret_key");

        let userData = tokenDecoded.user;

        if (userData) {
          setUser(userData);
        }
      } catch (err) {
        //token not verified -> signout
        logout();
      }
    }
  }, []);

  const login = async (loggedInUser) => {
    setUser(loggedInUser);

    var newToken = jwt.sign({ user: loggedInUser }, "secret_key", {
      expiresIn: "24h",
    });

    Cookies.set("access_token", newToken);
  };

  const logout = () => {
    setUser(null);

    Cookies.remove("access_token");
  };

  return (
    <AuthContext.Provider
      value={{
        isUserAuthenticated: user != null,
        user,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
