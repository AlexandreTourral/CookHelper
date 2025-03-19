import { Button, Stack } from "@mui/material";
import { ModalNewMeal } from "../organisms";
import { MenuApi } from "../../firebase/menuApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PlanningStore, reloadPlanning, updatePlanningStatus } from "../../store";
import { useObservable } from "@ngneat/react-rxjs";

import { PlanningApi } from "../../firebase";
import { selectMeals } from "../../API/geminiAI";
import { generateShoppingList, generateShoppingListPDF } from "../../hooks";

export function PlanningButton() {
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();
  const planningStore = useObservable(PlanningStore)[0]

  const handleSubmitForm = (name: string) => {
    setModalState(false);
    MenuApi.addMenu(name)
    navigate(".", { replace: true });
  }

  const handleAddMeal = async () => {
    const weekMeals = await selectMeals();
    await PlanningApi.addWeekMeals(weekMeals);
    reloadPlanning();
  }

  const handleDownloaShoppingList = async () => {
    const pdfBlob = await generateShoppingListPDF();
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Liste-de-Courses.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

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
      <Button variant="contained" color="primary" onClick={handleDownloaShoppingList}  sx={{ width: "fit-content", gap: "8px" }}>
        Générer la liste des courses
      </Button>
      <ModalNewMeal onClose={() => setModalState(false)} open={modalState} onSubmit={(name: string) => handleSubmitForm(name)} />
    </Stack>
  )
}