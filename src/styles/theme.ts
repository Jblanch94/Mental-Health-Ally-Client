import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    text: {
      primary: string;
      white: string;
      black: string;
    };
    primary: {
      main: string;
      secondary: string;
    };
    button: {
      main: string;
      secondary: string;
      white: string;
    };
    background: {
      paper: string;
    };
  }
  interface ThemeOptions {
    text?: {
      primary?: string;
      white?: string;
      black?: string;
    };
    primary?: {
      main?: string;
      secondary?: string;
    };
    button?: {
      main?: string;
      secondary?: string;
      white?: string;
    };
    background?: {
      paper?: string;
    };
  }
}

const theme = createTheme({
  text: {
    primary: "#ee6c4d",
    white: "#fff",
    black: "#333",
  },
  background: {
    paper: "#fff",
  },
  primary: {
    main: "#3d5a80",
    secondary: "#ee6c4d",
  },
  button: {
    main: "#3d5a80",
    secondary: "#ee6c4d",
    white: "#fff",
  },
});

export default theme;
