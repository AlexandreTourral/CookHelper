import { Box, Grid, Typography, Divider } from "@mui/material";
import { ingredient } from "../../type/recipeType";
import { RecipeCard } from "../atom";
import { motion } from "framer-motion";

type recipeListProps = {
  recipe: Record<string, ingredient[]>,
  mealKey: string[]
}

// Animation pour les cartes de recette
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: "easeOut"
    }
  })
};

export function RecipesList({ recipe, mealKey }: recipeListProps) {
  return (
    <Box>
      {mealKey.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {mealKey.length} {mealKey.length === 1 ? 'recette trouvée' : 'recettes trouvées'}
          </Typography>
          <Divider sx={{ mb: 3 }} />
        </Box>
      )}
      
      <Grid container spacing={3}>
        {mealKey.map((mealName: string, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={mealName}>
            <motion.div
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              layout
            >
              <RecipeCard recipe={recipe} mealName={mealName} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}