import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export function Layout() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Outlet />
    </Box>
  );
}