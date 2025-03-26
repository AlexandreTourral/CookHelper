import { Button, styled, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { useObservable } from "@ngneat/react-rxjs";
import { PlanningStore, reloadPlanning } from "../../store";
import CloseIcon from '@mui/icons-material/Close';
import { PlanningApi } from "../../firebase";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ModalMealToDay } from "../organisms";
import { useState } from "react";

type PlanningMealCardProps = {
  dayMeal: {
    name: string;
    lunch: string;
    diner: string;
  }
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.text.primary
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function PlanningMealCard({ dayMeal }: PlanningMealCardProps) {
  const planningStore = useObservable(PlanningStore)[0];
  const [isModalOpen, setModalStatus] = useState(false);
  const [mealType, setMealType] = useState("");
  
  const handleRemoveMeal = async (meals: string, type: string) => {
    await PlanningApi.updateMealToDayV2(dayMeal.name, meals, type);
    reloadPlanning();
  }

  const handleAddmeal = async (type: string) => {
    setModalStatus(false);
    await PlanningApi.updateMealToDayV2(dayMeal.name, planningStore.addMeal, type);
    reloadPlanning();
  }

  return (
    <StyledTableRow key={dayMeal.name}>
      <StyledTableCell component="th" scope="row">
        {dayMeal.name}
      </StyledTableCell>
      <StyledTableCell align="center">
        {dayMeal.lunch}
        { planningStore.isDeleting && dayMeal.lunch !== "Pas de repas prévu"
          ? <Button onClick={() => handleRemoveMeal("Pas de repas prévu", "lunch")}>
              <CloseIcon color="warning" />
            </Button>
          : null
        }
        { dayMeal.lunch === "Pas de repas prévu"
          ? <Button onClick={() => {setModalStatus(true), setMealType("lunch")}}>
              <AddBoxIcon color="success"/>
            </Button>
          : null
        }
      </StyledTableCell>
      <StyledTableCell align="center">
        {dayMeal.diner}
        { planningStore.isDeleting && dayMeal.diner !== "Pas de repas prévu"
          ? <Button onClick={() => handleRemoveMeal("Pas de repas prévu", "diner")}>
              <CloseIcon color="warning" />
            </Button>
          : null
        }
        { dayMeal.diner === "Pas de repas prévu"
          ? <Button onClick={() => {setModalStatus(true), setMealType("diner")}}>
              <AddBoxIcon color="success"/>
            </Button>
          : null
        }
        </StyledTableCell>
      <ModalMealToDay open={isModalOpen} onClose={() => setModalStatus(false)} onSubmit={() => handleAddmeal(mealType)} />
    </StyledTableRow>
  )
}