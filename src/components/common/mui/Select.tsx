import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";

interface SelectProps extends MuiSelectProps {}

function Select(props: SelectProps): JSX.Element {
  const { children, ...rest } = props;

  return <MuiSelect {...rest}>{children}</MuiSelect>;
}

export default Select;
