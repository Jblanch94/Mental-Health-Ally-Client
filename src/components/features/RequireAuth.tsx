import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/auth-context";

interface RequireAuthProps {
  children: JSX.Element;
}

function RequireAuth(props: RequireAuthProps) {
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (!auth?.authenticated) {
      navigate("/auth/login", { replace: true, state: location });
    }
  }, [auth?.authenticated, location, navigate]);

  return children;
}

export default RequireAuth;
