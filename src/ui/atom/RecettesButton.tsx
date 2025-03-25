import { Button, Stack } from "@mui/material";
import { ModalNewRecipe } from "../organisms";
import { MenuApi } from "../../firebase/menuApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { RecipeApi } from "../../firebase/recipeApi";
import { RecipeStore, resetIngredient, updateRecipeDeletingStatus } from "../../store/RecipeStore";
import { useObservable } from "@ngneat/react-rxjs";

export function RecettesButton() {
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();
    const recipeStore = useObservable(RecipeStore)[0]
  

  const handleSubmitForm =  async (name: string) => {
    setModalState(false);
    await MenuApi.addMenu(name);
    await RecipeApi.addRecipe(RecipeStore.value.ingredient, name);
    resetIngredient();
    navigate(".", { replace: true });
  }

  return (
    <Stack direction={"row"} spacing={2} sx={{ alignSelf: "end" }}>
      <Button variant="contained" color="primary" onClick={() => setModalState(true)} sx={{ width: "fit-content", gap: "8px" }}>
        Ajouter une recette
        <AddBoxIcon />
      </Button>
      {!recipeStore.isDeleting
        ? <Button variant="contained" color="primary" onClick={updateRecipeDeletingStatus} sx={{ width: "fit-content", gap: "8px" }}>
            Supprimer une recette
            <RemoveCircleOutlineIcon />
          </Button>
        : <Button variant="contained" color="primary" onClick={updateRecipeDeletingStatus} sx={{ width: "fit-content", gap: "8px" }}>
            Annuler
            <DoNotDisturbIcon />
          </Button>
      }
      <ModalNewRecipe open={modalState} onClose={() => setModalState(false)} onSubmit={(name) => handleSubmitForm(name)} />
    </Stack>
  )
}