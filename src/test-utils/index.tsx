import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import theme from "../styles/theme";

const ProvidersWrapper: FC = (props) => {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter>{children}</MemoryRouter>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ProvidersWrapper, ...options });

export * from "@testing-library/react";
export { customRender as render };
