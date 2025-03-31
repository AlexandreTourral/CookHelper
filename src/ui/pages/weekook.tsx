import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";

export function Weekook() {
  return (
    <MainLayout>
      <Box sx={{ padding: { xs: "16px", md: "32px" } }}>
        <Outlet />
      </Box>
    </MainLayout>
  );
}