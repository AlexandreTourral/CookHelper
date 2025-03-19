import { Box, Stack, Typography } from "@mui/material";
import { ingredient } from "../../type/recipeType";

type recipeListProps = {
  recipe: Record<string, ingredient[]>,
  mealKey: string[]
}

export function RecipesList({ recipe, mealKey }: recipeListProps) {
  return (
    <Box sx={{ marginTop: "16px" }}>
      <Stack direction="column"  spacing={2}>
        { mealKey.map((mealName: string) => (
          <Box key={mealName}>
            <Typography variant="h5">
              {mealName}
            </Typography>
            <Stack>
              {recipe[mealName].map((ingredient) => <Typography sx={{ marginLeft: "8px" }} key={ingredient.name}> {ingredient.name} {ingredient.quantity} {ingredient.type} </Typography>)}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}