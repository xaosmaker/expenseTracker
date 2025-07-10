import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { LayoutContext } from "./Layout";
import Menu from "@mui/icons-material/Menu"

export default function Navbar() {
  const layoutContext = useContext(LayoutContext)
  if (layoutContext === undefined) {
    throw new Error("Layout is undefined")
  }
  return (

    <AppBar position="fixed" sx={{ zIndex: layoutContext.theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {layoutContext.isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={layoutContext.handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div">
          Responsive App
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

