import { Box, Stack } from "@mui/material";
import { theme } from "../theme";
import {  RecettesButton } from "../atom";
import { useLoaderData } from "react-router-dom";
import { ingredient } from "../../type/recipeType";
import { RecipesList } from "../molecules";

export function Recettes() {
  const { recipe, mealKey } = useLoaderData() as { recipe: Record<string, ingredient[]>, mealKey: string[] }
  return (
    <Stack spacing={2}>
      <Box sx={{ width: "100%", backgroundColor: theme.palette.background.paper, borderRadius: "8px", border: "solid 1px", borderColor: theme.palette.secondary.main, padding: "16px 16px 16px 16px" }}>
        <RecettesButton />
      </Box>
      <Box sx={{ width: "100%", backgroundColor: theme.palette.background.paper, borderRadius: "8px", border: "solid 1px", borderColor: theme.palette.secondary.main, padding: "16px 16px 16px 16px" }}>
        { mealKey
          ? <RecipesList recipe={recipe} mealKey={mealKey} />
          : null }
      </Box>
    </Stack>
  )
}