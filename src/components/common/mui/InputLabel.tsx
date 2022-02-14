import {
  InputLabel as MuiInputLabel,
  InputLabelProps as MuiInputLabelProps,
} from "@mui/material";

interface InputLabelProps extends MuiInputLabelProps {}

function InputLabel(props: InputLabelProps): JSX.Element {
  const { children, ...rest } = props;

  return <MuiInputLabel {...rest}>{children}</MuiInputLabel>;
}

export default InputLabel;
