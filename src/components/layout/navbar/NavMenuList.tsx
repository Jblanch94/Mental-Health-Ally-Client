import React from "react";

import List from "../../common/mui/List";
import NavMenuListItem from "./NavMenuListItem";

type Route = {
  id: string;
  to: string;
  text: any;
};

interface NavMenuListProps {
  routes: Route[];
}

function NavMenuList(props: NavMenuListProps): JSX.Element {
  const { routes } = props;
  return (
    <List>
      {routes.map((route) => {
        return (
          <NavMenuListItem key={route.id} to={route.to} text={route.text} />
        );
      })}
    </List>
  );
}

export default NavMenuList;
