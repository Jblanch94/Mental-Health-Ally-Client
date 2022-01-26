import React from "react";
import {
  Divider as MuiDivder,
  DividerProps as MuiDividerProps,
} from "@mui/material";

interface DividerProps extends MuiDividerProps {}

function Divider(props: DividerProps): JSX.Element {
  const { children, ...rest } = props;
  return <MuiDivder {...rest}>{children}</MuiDivder>;
}

export default Divider;
