import { Box, Stack } from "@mui/material";
import { theme } from "../theme";
import { RecettesButton } from "../atom";
import { useLoaderData } from "react-router-dom";
import { ingredient } from "../../type/recipeType";
import { EmptyState, RecipesList } from "../molecules";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useState } from "react";
import { ModalNewRecipe } from "../organisms";
import { MenuApi } from "../../firebase/menuApi";
import { RecipeApi } from "../../firebase/recipeApi";
import { RecipeStore, resetIngredient } from "../../store/RecipeStore";
import { useNavigate } from "react-router-dom";

export function Recettes() {
  const { recipe, mealKey } = useLoaderData() as { recipe: Record<string, ingredient[]>, mealKey: string[] }
  const hasRecipes = Array.isArray(mealKey) && mealKey.length > 0;
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForm = async (name: string) => {
    setModalState(false);
    await MenuApi.addMenu(name);
    await RecipeApi.addRecipe(RecipeStore.value.ingredient, name);
    resetIngredient();
    navigate(".", { replace: true });
  };

  const openAddRecipeModal = () => {
    setModalState(true);
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ width: "100%", backgroundColor: theme.palette.background.paper, borderRadius: "8px", border: "solid 1px", borderColor: theme.palette.secondary.main, padding: "16px 16px 16px 16px" }}>
        <RecettesButton />
      </Box>
      
      {hasRecipes ? (
        <Box sx={{ width: "100%", backgroundColor: theme.palette.background.paper, borderRadius: "8px", border: "solid 1px", borderColor: theme.palette.secondary.main, padding: "16px 16px 16px 16px" }}>
          <RecipesList recipe={recipe} mealKey={mealKey} />
        </Box>
      ) : (
        <EmptyState 
          title="Aucune recette disponible" 
          description="Vous n'avez pas encore ajouté de recettes. Ajoutez votre première recette pour commencer à cuisiner!"
          icon={<MenuBookIcon sx={{ fontSize: 80 }} />}
          actionButton={{
            label: "Ajouter une recette",
            onClick: openAddRecipeModal
          }}
        />
      )}
      
      <ModalNewRecipe 
        open={modalState} 
        onClose={() => setModalState(false)} 
        onSubmit={handleSubmitForm} 
      />
    </Stack>
  )
}