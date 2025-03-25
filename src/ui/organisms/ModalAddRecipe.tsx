import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { theme } from "../theme";
import { useState } from "react";
import { ingredientEnum } from "../../type/recipeType";
import { addIngredient, addMealName, RecipeStore  } from "../../store/RecipeStore";
import { useObservable } from "@ngneat/react-rxjs";

type modalNewRecipeProps = {
  open: boolean
  onClose: () => void
  onSubmit: (name: string) => void
  meal: string;
  create?: boolean;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: theme.palette.background.paper,
  boxShadow: 24,
  p: 4,
};

export function ModalAddRecipe({ create, meal, open, onClose, onSubmit }: modalNewRecipeProps) {
  const [mealName, setMealName] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState<ingredientEnum>(ingredientEnum.g);
  const recipeStore = useObservable(RecipeStore)[0];
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(mealName);
  }

  const handleAddIngredients = () => {
    addMealName(meal);
    addIngredient(name, quantity, type);
    setName("");
    setQuantity(0);
    setType(ingredientEnum.g);
  }

  return (
    <Modal
      open={open}
      onClose={onClose} 
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit} >
          <Stack spacing={4} sx={{ alignItems: "center" }}>
            <Typography variant="h5" >
              📋 Ajouter une recette pour "{create === undefined ? meal : null}" 📋
            </Typography>
            {create !== undefined
              ? <TextField id="outlined-basic" label="Nom du menu" variant="outlined" color="secondary" value={mealName} onChange={(e) => setMealName(e.target.value)} />
              : null
            }
            <Typography>
              Ingredients:  
            </Typography>
            <Stack>
              {recipeStore.ingredient.map((ingredient) => <Typography key={ingredient.name}> { ingredient.name } {ingredient.quantity} {ingredient.type} </Typography>)}
            </Stack>
            <TextField id="outlined-basic" label="Nom de l'ingrédient" variant="outlined" color="secondary" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField id="outlined-basic" label="Quantité" variant="outlined" color="secondary" value={quantity} type="number" onChange={(e) => setQuantity(Number(e.target.value))} />
            <TextField
              id="outlined-select-currency-native"
              select
              label="Unité"
              value={type}
              onChange={(e) => setType(e.target.value as ingredientEnum)}
              slotProps={{
                select: {
                  native: true,
                },
              }}
              helperText="Veuillez sélectionner une unité"
            >
              {Object.values(ingredientEnum).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </TextField>
            <Button onClick={handleAddIngredients} variant="contained" color="secondary">
              Ajouter
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              Terminer
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}