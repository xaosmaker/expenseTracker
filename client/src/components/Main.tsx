import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useContext } from "react";
import { LayoutContext } from "./Layout";
import { Outlet } from "react-router-dom";

export default function Main() {

  const layoutContext = useContext(LayoutContext)
  if (layoutContext === undefined) {
    throw new Error("Layout Context is undefined")
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { md: `calc(100% - ${layoutContext.drawerWidth}px)` },
        overflowX: "hidden"
      }}
    >
      <Toolbar />
      <Outlet />
    </Box>
  )
}

