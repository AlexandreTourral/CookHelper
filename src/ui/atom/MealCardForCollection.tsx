import { Checkbox, Stack, Typography } from "@mui/material"
import { useObservable } from "@ngneat/react-rxjs";
import { addMealToCollection, MenuStore, removeMealFromCollection } from "../../store";
import { useEffect, useState } from "react";

type MealCardForCollectionProps = {
  meal: string
}

export function MealCardForCollection({ meal }: MealCardForCollectionProps) {
  const menuStore = useObservable(MenuStore, (state) => state);
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
      removeMealFromCollection(meal)
    } else {
      addMealToCollection(meal)
    }
  }

  return (
    <Stack key={meal} direction="row">
      <Checkbox onChange={handleCheckboxChecked} checked={checked} color="secondary" />
      <Typography variant="body1" sx={{ padding: "8px" }}>  { meal } </Typography>
    </Stack>
  )
}