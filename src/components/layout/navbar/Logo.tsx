import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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
      sx={{
        mx: 2,
        color: (theme) => theme.text.white,
        "&:hover": {
          color: (theme) => theme.primary.secondary,
        },
      }}>
      {text}
    </Link>
  );
}

export default Logo;
