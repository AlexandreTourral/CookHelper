import { Outlet } from "react-router-dom";
import { NavBar } from "../organisms";
import { Box } from "@mui/material";

export function Layout() {
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  )
}