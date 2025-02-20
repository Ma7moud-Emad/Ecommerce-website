import { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthUser(props) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("tkn")) {
      setToken(localStorage.getItem("tkn"));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthUser;
