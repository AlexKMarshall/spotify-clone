import React from "react";
import { AuthProvider } from "./auth-context";

const AppProviders = ({ children }) => <AuthProvider>{children}</AuthProvider>;

export default AppProviders;
