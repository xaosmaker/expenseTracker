import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { LayoutContext } from "../Layout";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { NavLink, useLocation } from "react-router-dom";
import { sidebarLinks, type SidebarLinks } from "../../data/sidebarData";
import ListItemButton from "@mui/material/ListItemButton";


export default function Sidebar() {
  const layoutContext = useContext(LayoutContext)
  if (layoutContext === undefined) {
    throw new Error("layout is undefined")
  }

  const { pathname } = useLocation()



  const drawer = (
    <Box sx={{
      width: layoutContext.drawerWidth,
    }}>
      <Toolbar />
      <Divider />
      <List>
        {sidebarLinks.map(({ to, text, icon: IconComponent }: SidebarLinks) => (
          <ListItemButton component={NavLink} selected={pathname === to} to={to} key={to}>
            <ListItemIcon> <IconComponent /> </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Box >
  );
  return (
    <Box
      component="nav"
      sx={{
        width: { md: layoutContext.drawerWidth }, flexShrink: { md: 0 }, boxSizing: "border-box"
      }}
      aria-label="mailbox folders"
    >
      {/* Mobile Drawer */}
      <Drawer
        variant={layoutContext.isMobile ? "temporary" : "permanent"}
        open={layoutContext.mobileOpen}
        onClose={layoutContext.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: layoutContext.isMobile ? "block" : "none", md: layoutContext.isMobile ? "none" : "block" },
          "& .MuiDrawer-paper": { width: layoutContext.drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Persistent Drawer */}
      {/* <Drawer */}
      {/**/}
      {/*   ModalProps={{ */}
      {/*     keepMounted: true, // Better mobile performance */}
      {/*   }} */}
      {/*   variant="permanent" */}
      {/*   sx={{ */}
      {/*     display: { xs: "none", md: "block" }, */}
      {/*     "& .MuiDrawer-paper": { width: layoutContext.drawerWidth, boxSizing: "border-box" }, */}
      {/*   }} */}
      {/*   open */}
      {/* > */}
      {/*   {drawer} */}
      {/* </Drawer> */}
    </Box>
  )
}

