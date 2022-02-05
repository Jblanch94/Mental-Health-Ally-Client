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
}

interface AuthContextProps {
  login: (formValues: FieldValues) => Promise<void>;
  signup: (formValues: FieldValues) => Promise<void>;
  authenticated: boolean;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextProps | null>(null);

function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  async function login(formValues: FieldValues) {
    await authService.login("/Login", formValues, {}, (response) => {
      if (response.status >= 200 && response.status < 400) {
        sessionStorage.setItem("accessToken", response.data.data);
        setAccessToken(response.data.data);
        setAuthenticated(true);
      } else {
        setAccessToken(null);
        setAuthenticated(false);
      }
    });
  }

  async function signup(formValues: FieldValues) {
    await authService.signup("/Register", formValues, {}, (response) => {
      if (response.status >= 200 && response.status < 400) {
        sessionStorage.setItem("accessToken", response.data.data);
        setAccessToken(response.data.data);
        setAuthenticated(true);
      } else {
        sessionStorage.removeItem("accessToken");
        setAccessToken(null);
        setAuthenticated(false);
      }
    });
  }

  // obtain access token and store it in memory
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setAccessToken(token);
    setAuthenticated(accessToken !== null);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ login, signup, accessToken, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
