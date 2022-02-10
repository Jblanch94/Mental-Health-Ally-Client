import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import theme from "../styles/theme";
import { AuthProvider } from "../contexts/auth-context";

const ProvidersWrapper = (props) => {
  const { children, initialRoutes } = props;
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <MemoryRouter initialEntries={initialRoutes}>{children}</MemoryRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

const customRender = (ui, options) => {
  const initialRoutes =
    options && options.initialRoutes ? options.initialRoutes : ["/"];
  return render(ui, {
    wrapper: (args) => ProvidersWrapper({ ...args, initialRoutes }),
    ...options,
  });
};

export * from "@testing-library/react";
export { customRender as render };
