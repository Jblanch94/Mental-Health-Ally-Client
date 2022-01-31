import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

interface ButtonProps extends MuiButtonProps {}

function Button(props: ButtonProps): JSX.Element {
  const { children, ...rest } = props;
  return <MuiButton {...rest}>{children}</MuiButton>;
}

export default Button;
