import { Checkbox, Stack, Typography } from "@mui/material"
import { useObservable } from "@ngneat/react-rxjs";
import { addMealToPlanning, MenuStore, removeMealFromPlanning } from "../../store";
import { useEffect, useState } from "react";

type MealCardForPlanningProps = {
  meal: string
}

export function MealCardForPlanning({ meal }: MealCardForPlanningProps) {
  const menuStore = useObservable(MenuStore);
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (menuStore[0].deleteItem.indexOf(meal) === -1) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }, [menuStore[0].isDeleting])

  const handleCheckboxChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    if (checked) {
      removeMealFromPlanning()
    } else {
      addMealToPlanning(meal)
    }
  }

  return (
    <Stack key={meal} direction="row">
      <Checkbox onChange={handleCheckboxChecked} checked={checked} color="secondary" />
      <Typography variant="body1" sx={{ padding: "8px" }}>  { meal } </Typography>
    </Stack>
  )
}