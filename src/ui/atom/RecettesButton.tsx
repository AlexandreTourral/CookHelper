import { Button, Stack, TextField, InputAdornment, Box } from "@mui/material";
import { ModalNewRecipe } from "../organisms";
import { MenuApi } from "../../firebase/menuApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import SearchIcon from '@mui/icons-material/Search';
import { RecipeApi } from "../../firebase/recipeApi";
import { RecipeStore, resetIngredient, updateRecipeDeletingStatus } from "../../store/RecipeStore";
import { useObservable } from "@ngneat/react-rxjs";

interface RecettesButtonProps {
  onSearch?: (searchTerm: string) => void;
}

export function RecettesButton({ onSearch }: RecettesButtonProps) {
  const [modalState, setModalState] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const recipeStore = useObservable(RecipeStore)[0];

  const handleSubmitForm =  async (name: string) => {
    setModalState(false);
    await MenuApi.addMenu(name);
    await RecipeApi.addRecipe(RecipeStore.value.ingredient, name);
    resetIngredient();
    navigate(".", { replace: true });
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignSelf: "end", mb: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setModalState(true)} 
          sx={{ 
            width: { xs: "100%", sm: "fit-content" }, 
            gap: "8px",
            borderRadius: "8px",
            fontWeight: 'bold'
          }}
        >
          Ajouter une recette
          <AddBoxIcon />
        </Button>
        {!recipeStore.isDeleting
          ? <Button 
              variant="contained" 
              color="primary" 
              onClick={updateRecipeDeletingStatus} 
              sx={{ 
                width: { xs: "100%", sm: "fit-content" }, 
                gap: "8px",
                borderRadius: "8px"
              }}
            >
              Supprimer une recette
              <RemoveCircleOutlineIcon />
            </Button>
          : <Button 
              variant="contained" 
              color="primary" 
              onClick={updateRecipeDeletingStatus} 
              sx={{ 
                width: { xs: "100%", sm: "fit-content" }, 
                gap: "8px",
                borderRadius: "8px"
              }}
            >
              Annuler
              <DoNotDisturbIcon />
            </Button>
        }
      </Stack>
      
      {onSearch && (
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher une recette..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { borderRadius: "8px" }
          }}
          sx={{ mb: 2 }}
        />
      )}
      
      <ModalNewRecipe open={modalState} onClose={() => setModalState(false)} onSubmit={(name) => handleSubmitForm(name)} />
    </Box>
  )
}