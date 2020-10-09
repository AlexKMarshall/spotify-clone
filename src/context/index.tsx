import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './auth-context';

const AppProviders: React.FC = ({ children }) => (
  <Router>
    <AuthProvider>{children}</AuthProvider>
  </Router>
);

export default AppProviders;
