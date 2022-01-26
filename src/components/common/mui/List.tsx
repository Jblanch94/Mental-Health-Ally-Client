import React from "react";
import { List as MuiList, ListProps as MuiListProps } from "@mui/material";

interface ListProps extends MuiListProps {}

function List(props: ListProps): JSX.Element {
  const { children, ...rest } = props;
  return <MuiList {...rest}>{children}</MuiList>;
}

export default List;
