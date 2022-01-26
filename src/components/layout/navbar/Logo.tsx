import React from "react";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Theme } from "@mui/material/styles";

// import Link from "../../common/mui/Link";

interface LogoProps {
  text: string;
}

function Logo(props: LogoProps): JSX.Element {
  const { text } = props;
  return (
    <Link
      variant='h6'
      component={RouterLink}
      to='/'
      underline='none'
      sx={{ mx: 2, color: (theme: Theme) => theme.text.white }}>
      {text}
    </Link>
  );
}

export default Logo;
