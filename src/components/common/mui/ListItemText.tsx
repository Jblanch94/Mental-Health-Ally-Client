import React from "react";
import {
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps,
} from "@mui/material";

interface ListItemTextProps extends MuiListItemTextProps {}

function ListItemText(props: ListItemTextProps): JSX.Element {
  const { children, ...rest } = props;
  return <MuiListItemText {...rest}>{children}</MuiListItemText>;
}

export default ListItemText;
