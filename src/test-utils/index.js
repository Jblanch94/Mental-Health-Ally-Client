import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import theme from "../styles/theme";
import { AuthProvider } from "../contexts/auth-context";

const ProvidersWrapper = (props) => {
  const { children, initialRoutes, authProviderProps } = props;
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider authenticated={authProviderProps.authenticated}>
        <MemoryRouter initialEntries={initialRoutes}>{children}</MemoryRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

const customRender = (ui, options) => {
  const initialRoutes =
    options && options.initialRoutes ? options.initialRoutes : ["/"];
  const authProviderProps = {
    authenticated:
      options && options.authProviderProps?.authenticated
        ? options.authProviderProps?.authenticated
        : false,
    accessToken:
      options && options.accessToken !== null ? options.accessToken : null,
  };

  return render(ui, {
    wrapper: (args) =>
      ProvidersWrapper({ ...args, initialRoutes, authProviderProps }),
    ...options,
  });
};

export * from "@testing-library/react";
export { customRender as render };
