import React, { useEffect, useContext, useMemo, useCallback } from "react";
import LoadingIndictator from "../components/LoadingIndicator";
import { client } from "../utils/api-client";
import { extractHash } from "../utils/hash";
import { useAsync } from "../utils/hooks";

const bootstrapAppData = async () => {
  let user = null;

  const hash = extractHash();
  const token = hash.access_token;

  if (token) {
    const data = await client("me", { token });
    user = { ...data, token };
  }

  return user;
};

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
  } = useAsync();

  useEffect(() => {
    const appDataPromise = bootstrapAppData();
    run(appDataPromise);
  }, [run]);

  const value = useMemo(() => ({ user }), [user]);

  if (isLoading || isIdle) {
    return <LoadingIndictator />;
  }

  if (isError) {
    console.error("there was some kind of error", error);
    return <div>There was an error</div>;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const useClient = () => {
  const { user } = useAuth();
  const token = user?.token;
  return useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  );
};

export { AuthProvider, useAuth, useClient };
