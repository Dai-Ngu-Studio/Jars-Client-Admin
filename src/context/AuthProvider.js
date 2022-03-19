import React, { useState } from "react";
import { auth } from "../firebase/config";
import { useHistory } from "react-router-dom";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const history = useHistory();
  React.useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, photoURL, email } = user;
        setUser({
          uid,
          displayName,
          photoURL,
          email,
        });
        history.push("/overview");

        return;
      }
      history.push("/login");
    });

    //clean function
    return () => {
      unsubscibed();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
