import React, { useState } from "react";
import { CssBaseline, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import AppBar from "../../common/mui/AppBar";
import Drawer from "./Drawer";
import IconButton from "../../common/mui/IconButton";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

interface NavbarProps {
  authenticated: boolean;
}

const Navbar = (props: NavbarProps): JSX.Element => {
  const { authenticated } = props;
  const [open, setOpen] = useState(false);

  function handleClose(): void {
    setOpen(false);
  }

  function handleOpen(): void {
    setOpen(true);
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: (theme) => theme.primary.main,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}>
      <CssBaseline />
      <Toolbar
        component='nav'
        disableGutters
        sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Logo text='Mental Health Ally' />
        {!open && (
          <IconButton
            onClick={handleOpen}
            sx={{
              display: { xs: "block", sm: "none" },
              cursor: "pointer",
              paddingRight: (theme) => theme.spacing(1),
              color: (theme) => theme.text.white,
            }}>
            <MenuIcon fontSize='medium' />
          </IconButton>
        )}
        <Drawer
          open={open}
          handleClose={handleClose}
          authenticated={authenticated}
        />
        <NavMenu authenticated={authenticated} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
