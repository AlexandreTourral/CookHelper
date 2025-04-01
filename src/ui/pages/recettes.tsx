import { Box, Typography, Container } from "@mui/material";
import { theme } from "../theme";
import { RecettesButton } from "../atom";
import { useLoaderData } from "react-router-dom";
import { ingredient } from "../../type/recipeType";
import { EmptyState, RecipesList } from "../molecules";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useState, useEffect } from "react";
import { ModalNewRecipe } from "../organisms";
import { MenuApi } from "../../firebase/menuApi";
import { RecipeApi } from "../../firebase/recipeApi";
import { RecipeStore, resetIngredient } from "../../store/RecipeStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Définir une animation pour les éléments entrants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function Recettes() {
  const { recipe, mealKey } = useLoaderData() as { recipe: Record<string, ingredient[]>, mealKey: string[] }
  const hasRecipes = Array.isArray(mealKey) && mealKey.length > 0;
  const [modalState, setModalState] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<string[]>(mealKey || []);
  const navigate = useNavigate();

  // Filtrer les recettes selon le terme de recherche
  useEffect(() => {
    if (!mealKey) return;
    
    if (searchTerm === "") {
      setFilteredRecipes(mealKey);
    } else {
      const filtered = mealKey.filter(recipe => 
        recipe.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  }, [searchTerm, mealKey]);

  const handleSubmitForm = async (name: string) => {
    setModalState(false);
    await MenuApi.addMenu(name);
    await RecipeApi.addRecipe(RecipeStore.value.ingredient, name);
    resetIngredient();
    navigate(".", { replace: true });
  };

  const openAddRecipeModal = () => {
    setModalState(true);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ 
          fontWeight: 'bold', 
          color: theme.palette.primary.main,
          mb: 3,
          textAlign: 'center' 
        }}>
          <FastfoodIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Mes Recettes
        </Typography>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Box sx={{ 
          width: "100%", 
          backgroundColor: theme.palette.background.paper, 
          borderRadius: "12px", 
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          border: "solid 1px", 
          borderColor: theme.palette.secondary.main, 
          padding: "16px",
          mb: 3
        }}>
          <RecettesButton onSearch={setSearchTerm} />
        </Box>
      </motion.div>
      
      {hasRecipes ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Box sx={{ 
            width: "100%", 
            backgroundColor: theme.palette.background.paper, 
            borderRadius: "12px", 
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            border: "solid 1px", 
            borderColor: theme.palette.secondary.main, 
            padding: "16px"
          }}>
            <RecipesList recipe={recipe} mealKey={filteredRecipes} />
            
            {filteredRecipes.length === 0 && searchTerm !== "" && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  Aucune recette ne correspond à votre recherche
                </Typography>
              </Box>
            )}
          </Box>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <EmptyState 
            title="Aucune recette disponible" 
            description="Vous n'avez pas encore ajouté de recettes. Ajoutez votre première recette pour commencer à cuisiner!"
            icon={<MenuBookIcon sx={{ fontSize: 80 }} />}
            actionButton={{
              label: "Ajouter une recette",
              onClick: openAddRecipeModal
            }}
          />
        </motion.div>
      )}
      
      <ModalNewRecipe 
        open={modalState} 
        onClose={() => setModalState(false)} 
        onSubmit={handleSubmitForm} 
      />
    </Container>
  )
}