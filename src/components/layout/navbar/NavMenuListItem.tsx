import React from "react";

import Link from "../../common/Link";
import ListItem from "../../common/mui/ListItem";
import ListItemText from "../../common/mui/ListItemText";

interface NavMenuListItemProps {
  to: string;
  text: string;
}

function NavMenuListItem(props: NavMenuListItemProps): JSX.Element {
  const { to, text } = props;
  return (
    <Link to={to}>
      <ListItem
        sx={{
          "&:hover": {
            backgroundColor: (theme) => theme.primary.main,
          },
        }}>
        <ListItemText
          sx={{
            "& .MuiListItemText-primary": {
              fontSize: (theme) => theme.spacing(3),
            },
          }}>
          {text}
        </ListItemText>
      </ListItem>
    </Link>
  );
}

export default NavMenuListItem;
