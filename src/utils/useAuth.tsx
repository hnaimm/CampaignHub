import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const AuthContext = createContext<{
  isUserAuthenticated: boolean;
  user: Object | null;
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
  console.log("SETUSER ", user);

  useEffect(() => {
    let token = Cookies.get("access_token");

    console.log("useEffect ", token);

    if (token) {
      try {
        let tokenDecoded = jwt.verify(token, "secret_key");
        console.log("tokenDecoded", tokenDecoded);

        let userData = tokenDecoded.user;

        console.log("userData", userData);
        if (userData) {
          setUser(userData);
        }
      } catch (err) {
        //token not verified -> signout
        console.log("err", err);
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
