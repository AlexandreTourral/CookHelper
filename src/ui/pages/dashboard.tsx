import { Box } from "@mui/material";
import { theme } from "../theme";
import { MealPlanArray } from "../organisms";

export function Dashboard() {
  return (
    <Box sx={{ width: "100%", backgroundColor: theme.palette.background.paper, borderRadius: "16px", textAlign: "center" }} >
      <MealPlanArray />
    </Box>
  )
}