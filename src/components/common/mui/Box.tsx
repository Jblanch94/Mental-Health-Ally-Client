import React from "react";
import { Box as MuiBox, BoxProps as MuiBoxProps } from "@mui/material";

interface BoxProps extends MuiBoxProps {}

function Box(props: BoxProps): JSX.Element {
  const { children, ...rest } = props;

  return <MuiBox {...rest}>{children}</MuiBox>;
}

export default Box;
