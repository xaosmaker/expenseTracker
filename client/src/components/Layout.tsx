import { createContext, useState } from "react";
import Main from "./layout/Main";
import Box from "@mui/material/Box";
import { useTheme, type Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";

interface LayoutContextType {
  isMobile: boolean,
  drawerWidth: number
  theme: Theme
  mobileOpen: boolean
  handleDrawerToggle: () => void
}

//TODO: Make custom hook for this
//TODO: optimize bundle and remove dublicate code

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

function Layout() {

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const layoutContext = {

    drawerWidth: 250

  }


  return (
    <LayoutContext value={{ ...layoutContext, isMobile, theme, handleDrawerToggle, mobileOpen }}>

      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Sidebar />

        <Main />
      </Box>
    </LayoutContext >


  )
}

export { LayoutContext }
export default Layout

