import { Button, Grid2, Stack, Typography } from "@mui/material";
import { useObservable } from "@ngneat/react-rxjs";
import { PlanningStore, reloadPlanning } from "../../store";
import CloseIcon from '@mui/icons-material/Close';
import { PlanningApi } from "../../firebase";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ModalMealToDay } from "../organisms";
import { useState } from "react";

type PlanningMealCardProps = {
  meal: string;
  type: string;
  day: number;
}

export function PlanningMealCard({ meal , type, day }: PlanningMealCardProps) {
  const planningStore = useObservable(PlanningStore)[0];
  const [isModalOpen, setModalStatus] = useState(false);
  
  const handleRemoveMeal = async (meals: string) => {
    await PlanningApi.updateMealToDay(day, meals, type);
    reloadPlanning();
  }

  const handleAddmeal = async () => {
    setModalStatus(false);
    await PlanningApi.updateMealToDay(day, planningStore.addMeal, type);
    reloadPlanning();
  }

  

  return (
    <Grid2 size="grow" sx={{ alignContent: "center", justifyItems: "center" }} >
      <Stack direction="row" flexWrap={"wrap"} sx={{ justifyContent: "center", alignItems: "center" }}>
        <Typography>
          { meal }
        </Typography>
        { planningStore.isDeleting && meal !== "Pas de repas prévu"
          ? <Button onClick={() => handleRemoveMeal("Pas de repas prévu")}>
              <CloseIcon color="warning" />
            </Button>
          : null
        }
        { meal === "Pas de repas prévu"
          ? <Button onClick={() => setModalStatus(true)}>
              <AddBoxIcon color="success"/>
            </Button>
          : null
        }
      </Stack>
      <ModalMealToDay open={isModalOpen} onClose={() => setModalStatus(false)} onSubmit={handleAddmeal} />
    </Grid2>
  )
}