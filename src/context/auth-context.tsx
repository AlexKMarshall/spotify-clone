import React, { useEffect, useContext, useMemo, useCallback } from 'react';
import LoadingIndictator from '../components/LoadingIndicator';
import { client } from '../utils/api-client';
import { extractHash } from '../utils/hash';
import { useAsync } from '../utils/hooks';
import { User, AuthUser } from '../types/User';

const bootstrapAppData = async () => {
  let user: AuthUser | null = null;

  const hash = extractHash();
  const token = hash.access_token;

  if (token) {
    const data = await client<User>('me', { token });
    user = { ...data, token };
  }

  return user;
};

type AuthContextType = {
  user: AuthUser;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = (props) => {
  const { data: user, status, error, isLoading, isIdle, isError, isSuccess, run } = useAsync();

  useEffect(() => {
    const appDataPromise = bootstrapAppData();
    run(appDataPromise);
  }, [run]);

  const value = useMemo(() => ({ user }), [user]);

  if (isLoading || isIdle) {
    return <LoadingIndictator />;
  }

  if (isError) {
    console.error('there was some kind of error', error);
    return <div>There was an error</div>;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const useClient = () => {
  const { user } = useAuth();
  const token = user?.token;
  return useCallback((endpoint, config) => client(endpoint, { ...config, token }), [token]);
};

export { AuthProvider, useAuth, useClient };
