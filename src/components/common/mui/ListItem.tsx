import React from "react";
import {
  ListItem as MuiListItem,
  ListItemProps as MuiListItemProps,
} from "@mui/material";

interface ListItemProps extends MuiListItemProps {}

function ListItem(props: ListItemProps): JSX.Element {
  const { children, ...rest } = props;
  return <MuiListItem {...rest}>{children}</MuiListItem>;
}

export default ListItem;
