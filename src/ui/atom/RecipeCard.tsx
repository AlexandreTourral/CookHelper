import { useObservable } from "@ngneat/react-rxjs";
import { ingredient } from "../../type/recipeType";
import { RecipeStore } from "../../store/RecipeStore";
import { Button, Card, CardContent, CardActions, Typography, Chip, IconButton, Divider, Box, Avatar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ScheduleIcon from '@mui/icons-material/Schedule';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import KitchenIcon from '@mui/icons-material/Kitchen';
import { RecipeApi } from "../../firebase/recipeApi";
import { useNavigate } from "react-router-dom";
import { theme } from "../theme";

type recipeCardProps = {
  recipe: Record<string, ingredient[]>,
  mealName: string
}

// Fonction pour extraire la première lettre du nom de la recette
const getInitial = (name: string): string => {
  return name.charAt(0).toUpperCase();
};

// Fonction pour générer une couleur aléatoire mais cohérente basée sur le nom
const stringToColor = (string: string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

export function RecipeCard({ recipe, mealName }: recipeCardProps) {
  const recipeStore = useObservable(RecipeStore);
  const navigate = useNavigate();
  const ingredients = recipe[mealName] || [];
  const ingredientCount = ingredients.length;

  const handleDeleteRecipe = async () => {
    await RecipeApi.removeRecipe(mealName);
    navigate(".", { replace: true });
  };

  return (
    <Card 
      elevation={3} 
      sx={{ 
        borderRadius: "12px", 
        overflow: "hidden",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
        }
      }}
    >
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        p: 2, 
        bgcolor: theme.palette.primary.main, 
        color: "white" 
      }}>
        <Avatar 
          sx={{ 
            bgcolor: stringToColor(mealName),
            mr: 2,
            width: 48,
            height: 48,
            fontSize: 20
          }}
        >
          {getInitial(mealName)}
        </Avatar>
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold", flexGrow: 1 }}>
          {mealName}
        </Typography>
        {recipeStore[0].isDeleting && (
          <IconButton 
            onClick={handleDeleteRecipe} 
            sx={{ 
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.3)",
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <KitchenIcon sx={{ color: theme.palette.secondary.main, mr: 1 }} />
          <Typography variant="subtitle1" color="text.secondary">
            {ingredientCount} {ingredientCount > 1 ? 'ingrédients' : 'ingrédient'}
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Ingrédients:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {ingredients.map((ingredient) => (
            <Chip 
              key={ingredient.name}
              label={`${ingredient.name} (${ingredient.quantity} ${ingredient.type})`}
              variant="outlined"
              size="small"
              icon={<RestaurantIcon />}
              sx={{ 
                borderRadius: "6px",
                "& .MuiChip-icon": { color: theme.palette.primary.main }
              }}
            />
          ))}
        </Box>
      </CardContent>
      
      <CardActions sx={{ justifyContent: "flex-end", p: 2, pt: 0 }}>
        <Button 
          size="small" 
          color="primary"
          startIcon={<ScheduleIcon />}
          onClick={() => alert(`Bientôt disponible: préparer ${mealName}`)}
        >
          Préparer
        </Button>
      </CardActions>
    </Card>
  );
}