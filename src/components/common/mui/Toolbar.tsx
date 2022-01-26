import React from "react";
import {
  Toolbar as MuiToolbar,
  ToolbarProps as MuiToolbarProps,
} from "@mui/material";

interface ToolbarProps extends MuiToolbarProps {}

function Toolbar(props: ToolbarProps): JSX.Element {
  const { children, ...rest } = props;
  return <MuiToolbar {...rest}>{children}</MuiToolbar>;
}

export default Toolbar;
