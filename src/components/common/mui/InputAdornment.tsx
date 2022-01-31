import React from "react";
import {
  InputAdornment as MuiInputAdornment,
  InputAdornmentProps as MuiInputAdornmentProps,
} from "@mui/material";

interface InputAdornmentProps extends MuiInputAdornmentProps {}

function InputAdornment(props: InputAdornmentProps): JSX.Element {
  const { children, ...rest } = props;

  return <MuiInputAdornment {...rest}>{children}</MuiInputAdornment>;
}

export default InputAdornment;
