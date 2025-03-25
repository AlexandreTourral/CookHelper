import { Button, Checkbox, Stack, Typography } from "@mui/material"
import { useObservable } from "@ngneat/react-rxjs";
import { addItem, MenuStore, removeItem } from "../../store";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { ModalAddRecipe } from "../organisms";
import { RecipeApi } from "../../firebase/recipeApi";
import { RecipeStore, resetIngredient } from "../../store/RecipeStore";
import { useNavigate } from "react-router-dom";

type MealCardProps = {
  meal: string
}

export function MealCard({ meal }: MealCardProps) {
  const menuStore = useObservable(MenuStore);
  const [checked, setChecked] = useState(false);
  const [modalIsOpen, setModalStatus] = useState(false)
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    setModalStatus(false)
    await RecipeApi.addRecipe(RecipeStore.value.ingredient, meal)
    resetIngredient();
    navigate(".", { replace: true });
  }

  return (
    <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
      <Stack key={meal} direction="row">
        { menuStore[0].isDeleting ? <Checkbox onChange={handleCheckboxChecked} checked={checked} color="secondary" /> : null }
        <Typography variant="body1" sx={{ padding: "8px" }}>  { meal } </Typography>
      </Stack>
      <Button color="inherit" onClick={() => setModalStatus(true)}>
        <EditIcon />
      </Button>
      <ModalAddRecipe meal={meal} onClose={() => setModalStatus(false)} onSubmit={handleSubmit} open={modalIsOpen} />
    </Stack>
  )
}