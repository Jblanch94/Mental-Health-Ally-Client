import { render, RenderOptions } from "@testing-library/react";
import { FC, ReactElement } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import theme from "../styles/theme";
import Home from "../pages/Home";

const ProvidersWrapper: FC = (props) => {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        {children}
      </MemoryRouter>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ProvidersWrapper, ...options });

export * from "@testing-library/react";
export { customRender as render };
