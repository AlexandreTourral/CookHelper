import { Box, Stack } from "@mui/material";
import { ingredient } from "../../type/recipeType";
import { RecipeCard } from "../atom";

type recipeListProps = {
  recipe: Record<string, ingredient[]>,
  mealKey: string[]
}

export function RecipesList({ recipe, mealKey }: recipeListProps) {
  return (
    <Box sx={{ marginTop: "16px" }}>
      <Stack direction="column"  spacing={2}>
        { mealKey.map((mealName: string) => (
          <RecipeCard key={mealName} recipe={recipe} mealName={mealName} />
        ))}
      </Stack>
    </Box>
  )
}