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
        <ButtonLink to='/auth/signup'>Sign Up</ButtonLink>
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
          aria-label='create-post'
          to='/posts/create'
          sx={{
            display: "block",
            mr: (theme) => theme.spacing(4),
            color: (theme) => theme.text.white,
            "&:hover": { color: (theme) => theme.primary.secondary },
          }}>
          <AddCircleIcon fontSize='medium' />
        </Link>

        <Link
          to='/user/account'
          sx={{
            display: "block",
            mr: (theme) => theme.spacing(2),
            fontSize: (theme) => theme.spacing(2),
            color: (theme) => theme.text.white,
            "&:hover": {
              color: (theme) => theme.primary.secondary,
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
        color: (theme) => theme.text.white,
      }}>
      {content}
    </Box>
  );
}

export default NavMenu;
