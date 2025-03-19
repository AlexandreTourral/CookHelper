import { Box, Stack, Typography } from "@mui/material";
import { theme } from "../theme";
import {  RecettesButton } from "../atom";
import { useLoaderData } from "react-router-dom";
import { ingredient } from "../../type/recipeType";

export function Recettes() {
  const { recipe, mealKey } = useLoaderData() as { recipe: Record<string, ingredient[]>, mealKey: string[] }
  return (
    <Box sx={{ width: "100%", backgroundColor: theme.palette.background.paper, borderRadius: "16px", border: "solid 1px", borderColor: theme.palette.secondary.main, padding: "16px 16px 16px 16px" }}>
      <RecettesButton />
      { mealKey.map((clé: string) => (
        <Stack  key={clé}>
          <Typography variant="h5">
            {clé}
          </Typography>
          {recipe[clé].map((ingredient) => <Typography key={ingredient.name}> {ingredient.name} {ingredient.quantity} {ingredient.type} </Typography>)}
        </Stack>
      ))}
    </Box>
  )
}