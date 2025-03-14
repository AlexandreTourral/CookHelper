import { Button, Stack } from "@mui/material";
import { ModalNewMeal } from "../organisms";
import { RecipeApi } from "../../firebase/recettesApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PlanningStore, reloadPlanning, resetMenu, updateMenuStatus, updatePlanningStatus } from "../../store";
import { useObservable } from "@ngneat/react-rxjs";

import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { PlanningApi } from "../../firebase";
import { DayMealType } from "../../type/menuType";

export function PlanningButton() {
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();
  const planningStore = useObservable(PlanningStore, (state) => state.isDeleting)[0]

  const handleSubmitForm = (name: string) => {
    setModalState(false);
    RecipeApi.addRecipes(name)
    navigate(".", { replace: true });
  }

  const handleAddMeal = async () => {
    const weekMeals: Record<string, DayMealType> = {
      "Lundi": { "lunch": "repas du lundi midi", "diner": "repas du lundi soir" },
      "Mardi": { "lunch": "repas du mardi midi", "diner": "repas du mardi soir" },
      "Mercredi": { "lunch": "repas du mercredi midi", "diner": "repas du mercredi soir" },
      "Jeudi": { "lunch": "repas du jeudi midi", "diner": "repas du jeudi soir" },
      "Vendredi": { "lunch": "repas du vendredi midi", "diner": "repas du vendredi soir" },
      "Samedi": { "lunch": "repas du lundi samedi", "diner": "repas du samedi soir" },
      "Dimanche": { "lunch": "repas du lundi dimanche", "diner": "repas du dimanche soir" },
    };
    await PlanningApi.addWeekMeals(weekMeals);
    reloadPlanning();
  }

  return (
    <Stack direction={"row"} spacing={2} sx={{ alignSelf: "end" }}>
      <Button variant="contained" color="primary" onClick={handleAddMeal} sx={{ width: "fit-content", gap: "8px" }}>
        Générer les menus
      </Button>
      {planningStore.isDeleting
        ? <Button variant="contained" color="primary" onClick={updatePlanningStatus} sx={{ width: "fit-content", gap: "8px" }}>
            OK
          </Button>
        : <Button variant="contained" color="primary" onClick={updatePlanningStatus} sx={{ width: "fit-content", gap: "8px" }}>
            Supprimer un plat
          </Button>
      }
      <ModalNewMeal onClose={() => setModalState(false)} open={modalState} onSubmit={(name: string) => handleSubmitForm(name)} />
    </Stack>
  )
}