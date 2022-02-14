import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { FieldValues } from "react-hook-form";

import authService from "../services/AuthenticationService";

interface AuthProviderProps {
  children: ReactNode;
  authenticated?: boolean;
}

interface AuthContextProps {
  login: (formValues: FieldValues) => Promise<void>;
  signup: (formValues: FieldValues) => Promise<void>;
  authenticated: boolean;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextProps | null>(null);

function AuthProvider({ children, authenticated = false }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(authenticated);

  async function login(formValues: FieldValues) {
    await authService.login("/Login", formValues, {}, (response) => {
      if (response.status >= 200 && response.status < 400) {
        sessionStorage.setItem("accessToken", response.data.data);
        setToken(response.data.data);
        setAuthenticated(true);
      } else {
        setToken(null);
        setAuthenticated(false);
      }
    });
  }

  async function signup(formValues: FieldValues) {
    await authService.signup("/Register", formValues, {}, (response) => {
      if (response.status >= 200 && response.status < 400) {
        sessionStorage.setItem("accessToken", response.data.data);
        setToken(response.data.data);
        setAuthenticated(true);
      } else {
        sessionStorage.removeItem("accessToken");
        setToken(null);
        setAuthenticated(false);
      }
    });
  }

  // obtain access token and store it in memory
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    setToken(accessToken);
    setAuthenticated(accessToken !== null);
  }, [token, authenticated]);

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        accessToken: token,
        authenticated: isAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
