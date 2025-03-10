import { Box, Stack, Typography } from "@mui/material";
import { theme } from "../theme";
import { useNavigate } from "react-router-dom";

export function SideBar() {
  const navigate = useNavigate()

  const handleDashboardNavigation = () => {
    navigate("dashboard")
  }

  const handleMenuNavigation = () => {
    navigate("menu")
  }

  const handlePlanningNavigation = () => {
    navigate("planning")
  }

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: "16px", border: "solid 1px", borderColor: theme.palette.secondary.main, width: "fit-content", padding: "16px" }}>
      <Stack direction={"column"} spacing={3} sx={{ alignItems: "flex-start" }}>
        <Typography component={"button"} variant="h5" onClick={handleDashboardNavigation} sx={{ cursor: "pointer" }}>
          Dashboard
        </Typography>
        <Typography component={"button"} variant="h5" onClick={handleMenuNavigation} sx={{ cursor: "pointer" }}>
          Menu
        </Typography>
        <Typography component={"button"} variant="h5" onClick={handlePlanningNavigation} sx={{ cursor: "pointer" }}>
          Planning
        </Typography>
      </Stack>
    </Box>
  )
}