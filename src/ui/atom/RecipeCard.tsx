import { useObservable } from "@ngneat/react-rxjs";
import { ingredient } from "../../type/recipeType";
import { RecipeStore } from "../../store/RecipeStore";
import { Button, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { RecipeApi } from "../../firebase/recipeApi";
import { useNavigate } from "react-router-dom";

type recipeCardProps = {
  recipe: Record<string, ingredient[]>,
  mealName: string
}

export function RecipeCard({ recipe, mealName }: recipeCardProps) {
  const recipeStore = useObservable(RecipeStore);
  const navigate = useNavigate();

  const handleDeleteRecipe = async () => {
    await RecipeApi.removeRecipe(mealName)
    navigate(".", { replace: true });
  }

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center", }}>
      { recipeStore[0].isDeleting ? (
        <Button variant="contained" color="primary" onClick={handleDeleteRecipe} sx={{ maxWidth: "40px", width: "inherit" }}>
          <CloseIcon color="warning" />
        </Button>
      ) : null }
      <Stack direction="column">
        <Typography variant="h5">
          {mealName}
        </Typography>
        <Stack>
        {recipe[mealName].map((ingredient) => <Typography sx={{ marginLeft: "8px" }} key={ingredient.name}> {ingredient.name} {ingredient.quantity} {ingredient.type} </Typography>)}
        </Stack>
      </Stack>
    </Stack>
  )
}