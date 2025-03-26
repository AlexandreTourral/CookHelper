import { Box } from "@mui/material";
import { MealPlanArray } from "../organisms";
import { theme } from "../theme";
import { PlanningButton } from "../atom";

export function Planning() {
  return (
    <Box sx={{ width: "100%", backgroundColor: theme.palette.background.paper, borderRadius: "8px", textAlign: "center", border: "solid 1px", borderColor: theme.palette.secondary.main, padding: "16px 16px 16px 16px" }}>
      <PlanningButton />
      <MealPlanArray />
    </Box>
  )
}