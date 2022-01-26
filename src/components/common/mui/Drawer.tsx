import React from "react";
import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
} from "@mui/material";

interface DrawerProps extends MuiDrawerProps {}

function Drawer(props: DrawerProps): JSX.Element {
  const { children, ...rest } = props;

  return <MuiDrawer {...rest}>{children}</MuiDrawer>;
}

export default Drawer;
