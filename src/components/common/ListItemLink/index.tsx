import { useMemo, ReactElement, forwardRef } from "react";
import {
  LinkProps as RouterLinkProps,
  Link as RouterLink,
} from "react-router-dom";
import { SxProps, Theme } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import ListItemText from "../mui/ListItemText";

interface ListItemLinkProps {
  icon?: ReactElement;
  primary: string;
  to: string;
  sx?: SxProps<Theme>;
}

function ListItemLink(props: ListItemLinkProps): JSX.Element {
  const { primary, to, icon, sx } = props;

  const renderLink = useMemo(() => {
    return forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(
      function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }
    );
  }, [to]);

  return (
    <li>
      <ListItemButton role={undefined} component={renderLink} sx={sx}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText
          primary={primary}
          inset
          sx={{
            ".css-10hburv-MuiTypography-root": {
              fontSize: 18,
            },
          }}
        />
      </ListItemButton>
    </li>
  );
}

export default ListItemLink;
