import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";

import Box from "../../common/mui/Box";
import ButtonLink from "../../common/ButtonLink";
import Link from "../../common/Link";

interface NavMenuProps {
  authenticated: boolean;
}

function NavMenu(props: NavMenuProps): JSX.Element {
  const { authenticated } = props;

  let content;

  if (!authenticated) {
    content = (
      <>
        <ButtonLink to='/auth/login'>Login</ButtonLink>
        <ButtonLink to='/auth/register'>Sign Up</ButtonLink>
      </>
    );
  } else {
    content = (
      <Box
        sx={{
          display: "flex",
          verticalAlign: "text-bottom",
          flexWrap: "wrap",
        }}>
        <Link
          to='/posts/create'
          sx={{
            display: "block",
            mr: (theme) => theme.spacing(4),
            "&:hover": { color: (theme) => theme.text.white },
          }}>
          <AddCircleIcon fontSize='medium' />
        </Link>

        <Link
          to='/user/account'
          sx={{
            display: "block",
            mr: (theme) => theme.spacing(2),
            fontSize: (theme) => theme.spacing(2),
            "&:hover": {
              color: (theme) => theme.text.white,
            },
          }}>
          jblanchard
        </Link>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "block" },
      }}>
      {content}
    </Box>
  );
}

export default NavMenu;
