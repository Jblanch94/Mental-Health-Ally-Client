import React from "react";
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material";

interface IconButtonProps extends MuiIconButtonProps {}

function IconButton(props: IconButtonProps): JSX.Element {
  const { children, ...rest } = props;
  return <MuiIconButton {...rest}>{children}</MuiIconButton>;
}

export default IconButton;
