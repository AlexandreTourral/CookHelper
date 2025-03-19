import { Button, Stack } from "@mui/material";
import { ModalNewMeal, ModalNewRecipe } from "../organisms";
import { MenuApi } from "../../firebase/menuApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MenuStore, resetMenu, updateMenuStatus } from "../../store";
import { useObservable } from "@ngneat/react-rxjs";

import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { RecipeApi } from "../../firebase/recipeApi";
import { RecipeStore } from "../../store/RecipeStore";

export function RecettesButton() {
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();
  const menuStore = useObservable(MenuStore);

  const handleSubmitForm =  async (name: string) => {
    setModalState(false);
    await MenuApi.addMenu(name);
    await RecipeApi.addRecipe(RecipeStore.value.ingredient, name);
    navigate(".", { replace: true });
  }

  const handleRemoveMeal = () => {
    MenuApi.removeMenu(menuStore[0].deleteItem);
    resetMenu();
    navigate(".", { replace: true });
  }

  return (
    <Stack direction={"row"} spacing={2} sx={{ alignSelf: "end" }}>
      <Button variant="contained" color="primary" onClick={() => setModalState(true)} sx={{ width: "fit-content", gap: "8px" }}>
        Ajouter une recette
        <AddBoxIcon />
      </Button>
      <Button variant="contained" color="primary" onClick={updateMenuStatus} sx={{ width: "fit-content", gap: "8px" }}>
        Supprimer une recette
        <RemoveCircleOutlineIcon />
      </Button>
      <ModalNewRecipe open={modalState} onClose={() => setModalState(false)} onSubmit={(name) => handleSubmitForm(name)} />
    </Stack>
  )
}