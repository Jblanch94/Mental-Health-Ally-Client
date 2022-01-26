import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./navbar/index";

function Layout(): JSX.Element {
  return (
    <>
      <Navbar authenticated />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
