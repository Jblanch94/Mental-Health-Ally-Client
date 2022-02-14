import {
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiItemProps,
} from "@mui/material";

interface MenuItemProps extends MuiItemProps {}

function MenuItem(props: MenuItemProps): JSX.Element {
  const { children, ...rest } = props;

  return <MuiMenuItem {...rest}>{children}</MuiMenuItem>;
}

export default MenuItem;
