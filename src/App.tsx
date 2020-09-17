import React from 'react';
import LoadingIndictator from './components/LoadingIndicator';
import { useAuth } from './context/auth-context';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

const App = () => {
    const { user } = useAuth();

    return (
        <React.Suspense fallback={<LoadingIndictator />}>
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
    );
};

export default App;
