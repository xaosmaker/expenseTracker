import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { LayoutContext } from "../Layout";
import Home from "@mui/icons-material/Home";
import Info from "@mui/icons-material/Info";
import Contacts from "@mui/icons-material/Contacts";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

const menuItems = [
  { text: "Home", icon: <Home /> },
  { text: "About", icon: <Info /> },
  { text: "Contact", icon: <Contacts /> },
];

export default function Sidebar() {
  const layoutContext = useContext(LayoutContext)
  if (layoutContext === undefined) {
    throw new Error("layout is undefined")
  }

  const drawer = (
    <Box sx={{
      width: layoutContext.drawerWidth,
    }}>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
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

