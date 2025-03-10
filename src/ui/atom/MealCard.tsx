import { Checkbox, Stack, Typography } from "@mui/material"
import { useObservable } from "@ngneat/react-rxjs";
import { addItem, MenuStore, removeItem } from "../../store";
import { useEffect, useState } from "react";

type MealCardProps = {
  meal: string
}

export function MealCard({ meal }: MealCardProps) {
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
      removeItem(meal)
    } else {
      addItem(meal)
    }
  }

  return (
    <Stack key={meal} direction="row">
      { menuStore[0].isDeleting ? <Checkbox onChange={handleCheckboxChecked} checked={checked} color="secondary" /> : null }
      <Typography variant="body1" sx={{ padding: "8px" }}>  { meal } </Typography>
    </Stack>
  )
}