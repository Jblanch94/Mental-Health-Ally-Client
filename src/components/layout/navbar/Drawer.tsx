import React from "react";
import { v4 as uuidv4 } from "uuid";

import NavMenuList from "./NavMenuList";
import MuiDrawer from "../../common/mui/Drawer";
import Toolbar from "../../common/mui/Toolbar";
import Box from "../../common/mui/Box";

interface DrawerProps {
  open: boolean;
  handleClose: () => void;
  authenticated: boolean;
}

function Drawer(props: DrawerProps): JSX.Element {
  const { open, handleClose, authenticated } = props;
  const drawerWidth = 240;
  const routes = authenticated
    ? [
        { id: uuidv4(), to: "/posts/create", text: "Create Post" },
        { id: uuidv4(), to: "/users/account", text: "jblanchard" },
      ]
    : [
        { id: uuidv4(), to: "/auth/login", text: "Login" },
        { id: uuidv4(), to: "/auth/register", text: "Sign Up" },
      ];

  const drawer = (
    <Box>
      <Toolbar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} />
      <NavMenuList routes={routes} />
    </Box>
  );

  return (
    <>
      <MuiDrawer
        open={open}
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        anchor='right'
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        variant='temporary'>
        {drawer}
      </MuiDrawer>
    </>
  );
}

export default Drawer;
