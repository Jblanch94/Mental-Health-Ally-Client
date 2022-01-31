import React from "react";
import { Stack as MuiStack, StackProps as MuiStackProps } from "@mui/material";

interface StackProps extends MuiStackProps {}

function Stack(props: StackProps): JSX.Element {
  const { children, ...rest } = props;
  return <MuiStack {...rest}>{children}</MuiStack>;
}

export default Stack;
