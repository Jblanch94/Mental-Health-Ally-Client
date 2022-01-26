import React from "react";
import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  TypographyProps,
} from "@mui/material";

interface LinkProps extends MuiLinkProps {}

function Link(
  props: LinkProps & TypographyProps<"a", { component: "a" }>
): JSX.Element {
  const { children, ...rest } = props;

  return <MuiLink {...rest}>{children}</MuiLink>;
}

export default Link;
