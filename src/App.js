import React from "react";
import LoadingIndictator from "./components/LoadingIndicator";
import { useAuth } from "./context/auth-context";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));

function App() {
  const { token } = useAuth();

  return (
    <React.Suspense fallback={<LoadingIndictator />}>
      {token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
