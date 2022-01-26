import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

interface LinkProps extends MuiLinkProps {
  to: string;
}

function Link(props: LinkProps): JSX.Element {
  const { children, to, sx, ...rest } = props;

  return (
    <MuiLink
      component={RouterLink}
      to={to}
      sx={{
        textDecoration: "none",
        color: (theme) => theme.primary.secondary,
        ...sx,
      }}
      {...rest}>
      {children}
    </MuiLink>
  );
}

export default Link;
