import { Box, Stack, Typography } from "@mui/material";
import { theme } from "../theme";
import { useNavigate } from "react-router-dom";
import { useObservable } from "@ngneat/react-rxjs";
import { SidebarState } from "../../store/SideBarStore";

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export function SideBar() {
  const navigate = useNavigate()
  const sidebarState = useObservable(SidebarState)[0]

  const handleDashboardNavigation = () => {
    navigate("dashboard")
  }

  const handleMenuNavigation = () => {
    navigate("menu")
  }

  const handlePlanningNavigation = () => {
    navigate("planning")
  }

  const handleRecetteNavigation = () => {
    navigate("recettes")
  }

  const sidebarContent = (
    <Stack direction={"column"} spacing={3} sx={{ alignItems: "flex-start" }}>
      <Typography component={"button"} variant="h5" onClick={handleDashboardNavigation} sx={{ cursor: "pointer" }}>
        <SpaceDashboardIcon />
      </Typography>
      <Typography component={"button"} variant="h5" onClick={handleMenuNavigation} sx={{ cursor: "pointer" }}>
        <RestaurantMenuIcon />
      </Typography>
      <Typography component={"button"} variant="h5" onClick={handlePlanningNavigation} sx={{ cursor: "pointer" }}>
        <CalendarMonthIcon />
      </Typography>
      <Typography component={"button"} variant="h5" onClick={handleRecetteNavigation} sx={{ cursor: "pointer" }}>
        <MenuBookIcon />
      </Typography>
    </Stack>
  )

  const expandedSidebarContent = (
    <Stack direction={"column"} spacing={3} sx={{ alignItems: "flex-start" }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center"}}>
        <SpaceDashboardIcon />
        <Typography component={"button"} variant="h5" onClick={handleDashboardNavigation} sx={{ cursor: "pointer" }}>
          Dashboard
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center"}}>
        <RestaurantMenuIcon />
        <Typography component={"button"} variant="h5" onClick={handleMenuNavigation} sx={{ cursor: "pointer" }}>
          Menu
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center"}}>
        <CalendarMonthIcon />
        <Typography component={"button"} variant="h5" onClick={handlePlanningNavigation} sx={{ cursor: "pointer" }}>
          Planning
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center"}}>
        <MenuBookIcon />
        <Typography component={"button"} variant="h5" onClick={handleRecetteNavigation} sx={{ cursor: "pointer" }}>
          Recettes
        </Typography>
      </Stack>
    </Stack>
  )

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: "8px", border: "solid 1px", borderColor: theme.palette.secondary.main, width: "fit-content", padding: "16px", margin: "32px 0px 32px 16px", height: "100%" }}>
      {sidebarState.isHidden ? expandedSidebarContent : sidebarContent}
    </Box>
  )
}