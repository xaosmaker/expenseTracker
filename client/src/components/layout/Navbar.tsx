import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { LayoutContext } from "../Layout";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle"
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const layoutContext = useContext(LayoutContext)
  if (layoutContext === undefined) {
    throw new Error("Layout is undefined")
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (

    <AppBar position="fixed" sx={{ zIndex: layoutContext.theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {layoutContext.isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={layoutContext.handleDrawerToggle}
            sx={{ mr: 2 }}
          >
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div">
          Expense Tracker
        </Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
        >
          <MenuItem component={NavLink} to={"/me"} >My Profile</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

