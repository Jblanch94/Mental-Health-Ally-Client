import React from "react";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface ButtonLinkProps {
  to: string;
  children: React.ReactNode;
}

function ButtonLink(props: ButtonLinkProps): JSX.Element {
  const { to, children } = props;
  return (
    <Link
      component={RouterLink}
      to={to}
      sx={{
        textAlign: "center",
        border: 1,
        borderColor: (theme) => theme.button.secondary,
        color: (theme) => theme.text.black,
        backgroundColor: (theme) => theme.button.secondary,
        textDecoration: "none",
        px: (theme) => theme.spacing(2),
        py: (theme) => theme.spacing(1),
        borderRadius: (theme) => theme.spacing(0.5),
        fontSize: "1.4rem",
        mx: (theme) => theme.spacing(2),
        "&:hover": {
          backgroundColor: (theme) => theme.button.white,
          color: (theme) => theme.button.main,
          borderColor: (theme) => theme.button.white,
        },
      }}>
      {children}
    </Link>
  );
}

export default ButtonLink;
