import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { LayoutContext } from "./Layout";

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
      }}
    >
      <Toolbar />
      <div className="h-dvh bg-red-50">

        Hello from here
      </div>
    </Box>
  )
}

