import React from "react";
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from "@mui/material";

interface TypographyProps extends MuiTypographyProps {}

function Typography(props: TypographyProps): JSX.Element {
  const { children, ...rest } = props;
  return <MuiTypography {...rest}>{children}</MuiTypography>;
}

export default Typography;
