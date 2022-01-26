import React from "react";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
} from "@mui/material";

interface AppBarProps extends MuiAppBarProps {}

function AppBar(props: AppBarProps): JSX.Element {
  const { children, ...rest } = props;
  return <MuiAppBar {...rest}>{children}</MuiAppBar>;
}

export default AppBar;
