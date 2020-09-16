import React, { useState, useEffect, useContext, useMemo } from "react";

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      const parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
  }, []);

  const value = useMemo(() => ({ token }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
