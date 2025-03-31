import { 
  Box, 
  Button, 
  Chip,
  Divider, 
  FormControl,
  FormHelperText,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField, 
  Typography,
  useMediaQuery
} from "@mui/material";
import { theme } from "../theme";
import { useState, useEffect } from "react";
import { ingredientEnum } from "../../type/recipeType";
import { addIngredient, addMealName, RecipeStore } from "../../store/RecipeStore";
import { useObservable } from "@ngneat/react-rxjs";
import { ModernModal } from "../molecules";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from "@mui/material/styles";

type ModalAddRecipeProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  meal: string;
  create?: boolean;
}

export function ModalAddRecipe({ create, meal, open, onClose, onSubmit }: ModalAddRecipeProps) {
  const [mealName, setMealName] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState<ingredientEnum>(ingredientEnum.g);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recipeStore = useObservable(RecipeStore)[0];
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  
  // Réinitialiser le formulaire pour le nom du repas à chaque ouverture
  useEffect(() => {
    if (open) {
      setMealName("");
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      await onSubmit(mealName);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAddIngredient = () => {
    if (!name.trim() || quantity <= 0) return;
    
    addMealName(meal);
    addIngredient(name, quantity, type);
    setName("");
    setQuantity(0);
    setType(ingredientEnum.g);
  };

  const hasIngredients = recipeStore.ingredient.length > 0;
  const canAddIngredient = name.trim() !== "" && quantity > 0;
  const canSubmit = (create ? mealName.trim() !== "" : true) && hasIngredients;
  
  return (
    <ModernModal
      open={open}
      onClose={onClose}
      title={create ? "Ajouter une recette" : `Ajouter une recette pour "${meal}"`}
      icon={<MenuBookIcon sx={{ fontSize: 28 }} />}
      maxWidth={600}
      actions={
        <>
          <Button 
            variant="outlined" 
            onClick={onClose}
            disabled={isSubmitting}
            sx={{
              borderRadius: 1.5,
              py: 1,
              px: 2,
              fontWeight: 500,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: 'rgba(0,0,0,0.01)'
              }
            }}
          >
            Annuler
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            sx={{
              borderRadius: 1.5,
              py: 1,
              px: 2,
              fontWeight: 500,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
              '&:hover': {
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              }
            }}
          >
            {isSubmitting ? "Création en cours..." : "Terminer"}
          </Button>
        </>
      }
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        {create && (
          <TextField
            label="Nom du menu"
            variant="outlined"
            fullWidth
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            required={create}
            autoFocus={create}
            InputProps={{
              sx: {
                borderRadius: 1.5,
              }
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                }
              }
            }}
          />
        )}
        
        <Divider sx={{ my: 2 }}>
          <Chip 
            label="Ingrédients" 
            sx={{ 
              fontWeight: 500,
              backgroundColor: theme.palette.primary.main + '20',
              color: theme.palette.primary.main
            }} 
          />
        </Divider>
        
        {hasIngredients ? (
          <Paper 
            variant="outlined" 
            sx={{ 
              mb: 3, 
              borderRadius: 2, 
              borderColor: 'rgba(0,0,0,0.1)',
              maxHeight: '150px',
              overflowY: 'auto'
            }}
          >
            <List dense disablePadding>
              {recipeStore.ingredient.map((ingredient, index) => (
                <ListItem 
                  key={`${ingredient.name}-${index}`}
                  divider={index < recipeStore.ingredient.length - 1}
                  sx={{ py: 1.2 }}
                >
                  <Typography>
                    <strong>{ingredient.name}</strong>: {ingredient.quantity} {ingredient.type}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <Box 
            sx={{ 
              p: 2, 
              textAlign: 'center', 
              mb: 3,
              bgcolor: 'rgba(0,0,0,0.02)', 
              borderRadius: 2,
              border: '1px dashed rgba(0,0,0,0.1)'
            }}
          >
            <Typography color="text.secondary">
              Aucun ingrédient ajouté. Ajoutez au moins un ingrédient pour créer votre recette.
            </Typography>
          </Box>
        )}
        
        <Stack direction={isMobile ? "column" : "row"} spacing={2} sx={{ mb: 2 }}>
          <TextField
            label="Nom de l'ingrédient"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              sx: {
                borderRadius: 1.5,
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                }
              }
            }}
          />
          
          <TextField
            label="Quantité"
            variant="outlined"
            type="number"
            value={quantity === 0 ? "" : quantity}
            inputProps={{ min: 0 }}
            onChange={(e) => setQuantity(Number(e.target.value))}
            InputProps={{
              sx: {
                borderRadius: 1.5,
              }
            }}
            sx={{
              width: isMobile ? '100%' : '30%',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                }
              }
            }}
          />
          
          <FormControl sx={{ width: isMobile ? '100%' : '20%' }}>
            <InputLabel id="unit-select-label">Unité</InputLabel>
            <Select
              labelId="unit-select-label"
              value={type}
              label="Unité"
              onChange={(e) => setType(e.target.value as ingredientEnum)}
              sx={{ 
                borderRadius: 1.5,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                }
              }}
            >
              {Object.values(ingredientEnum).map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            onClick={handleAddIngredient}
            disabled={!canAddIngredient}
            variant="outlined"
            startIcon={<AddCircleIcon />}
            sx={{
              borderRadius: 1.5,
              py: 1,
              px: 3,
              fontWeight: 500,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: 'rgba(0,0,0,0.01)'
              }
            }}
          >
            Ajouter l'ingrédient
          </Button>
        </Box>
      </Box>
    </ModernModal>
  );
}