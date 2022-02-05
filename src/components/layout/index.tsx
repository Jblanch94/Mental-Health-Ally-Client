import { Outlet } from "react-router-dom";

import Navbar from "./navbar/index";
import { useAuth } from "../../contexts/auth-context";

function Layout(): JSX.Element {
  const auth = useAuth();
  return (
    <>
      <Navbar authenticated={auth?.authenticated ?? false} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
