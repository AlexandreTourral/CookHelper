import { useState } from "react";
import { Box, Button, Grid, Rating, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon, ListItemText, Snackbar, Alert } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ingredientEnum } from "../../../type/recipeType";
import { MenuApi } from "../../../firebase/menuApi";
import { RecipeApi } from "../../../firebase/recipeApi";

const desserts = [
  {
    id: 1,
    titre: "Tarte au citron meringuée",
    auteur: "Marie Lambert",
    temps: "1h20",
    difficulte: "Intermédiaire",
    notation: 4.8,
    nbAvis: 42,
    ingredients: 8,
    listeIngredients: [
      "Pâte sablée", 
      "4 citrons", 
      "150g de sucre", 
      "100g de beurre", 
      "4 œufs", 
      "2 blancs d'œufs", 
      "100g de sucre glace", 
      "1 pincée de sel"
    ],
    etapes: [
      "Préchauffer le four à 180°C.",
      "Étaler la pâte dans un moule à tarte et la piquer à la fourchette.",
      "Presser les citrons et récupérer le zeste d'un citron.",
      "Mélanger les œufs, le sucre, le jus de citron et le zeste.",
      "Faire fondre le beurre et l'incorporer au mélange.",
      "Verser sur le fond de tarte et enfourner pour 25-30 minutes.",
      "Monter les blancs en neige avec le sucre glace pour la meringue.",
      "Répartir la meringue sur la tarte refroidie et passer au four 10 minutes."
    ]
  },
  {
    id: 2,
    titre: "Mousse au chocolat",
    auteur: "Sophie Martin",
    temps: "30min",
    difficulte: "Facile",
    notation: 4.5,
    nbAvis: 67,
    ingredients: 4,
    listeIngredients: [
      "200g de chocolat noir", 
      "6 œufs", 
      "50g de sucre", 
      "1 pincée de sel"
    ],
    etapes: [
      "Faire fondre le chocolat au bain-marie.",
      "Séparer les blancs des jaunes d'œufs.",
      "Mélanger les jaunes avec le chocolat fondu.",
      "Monter les blancs en neige avec le sucre et le sel.",
      "Incorporer délicatement les blancs au mélange chocolaté.",
      "Répartir dans des ramequins et réfrigérer 4 heures minimum."
    ]
  },
  {
    id: 3,
    titre: "Tiramisu",
    auteur: "Laura Blanc",
    temps: "45min",
    difficulte: "Intermédiaire",
    notation: 4.7,
    nbAvis: 53,
    ingredients: 7,
    listeIngredients: [
      "250g de mascarpone", 
      "3 œufs", 
      "75g de sucre", 
      "24 biscuits à la cuillère", 
      "50cl de café fort", 
      "Cacao en poudre", 
      "1 pincée de sel"
    ],
    etapes: [
      "Préparer un café fort et le laisser refroidir.",
      "Séparer les blancs des jaunes d'œufs.",
      "Mélanger les jaunes avec le sucre jusqu'à blanchiment.",
      "Ajouter le mascarpone et mélanger jusqu'à obtenir une crème lisse.",
      "Monter les blancs en neige ferme avec le sel.",
      "Incorporer délicatement les blancs à la préparation au mascarpone.",
      "Tremper rapidement les biscuits dans le café et les disposer dans un plat.",
      "Recouvrir d'une couche de crème et répéter l'opération.",
      "Saupoudrer de cacao et réfrigérer au moins 4 heures."
    ]
  },
  {
    id: 4,
    titre: "Crème brûlée",
    auteur: "Paul Durand",
    temps: "1h",
    difficulte: "Difficile",
    notation: 4.6,
    nbAvis: 38,
    ingredients: 6,
    listeIngredients: [
      "50cl de crème liquide", 
      "1 gousse de vanille", 
      "5 jaunes d'œufs", 
      "80g de sucre", 
      "Cassonade pour caraméliser", 
      "1 pincée de sel"
    ],
    etapes: [
      "Préchauffer le four à 100°C (thermostat 3-4).",
      "Faire bouillir la crème avec la gousse de vanille fendue et grattée.",
      "Fouetter les jaunes avec le sucre et le sel.",
      "Verser progressivement la crème chaude sur le mélange en fouettant.",
      "Répartir dans des ramequins et cuire au bain-marie 45-50 minutes.",
      "Laisser refroidir puis réfrigérer au moins 3 heures.",
      "Saupoudrer de cassonade et caraméliser au chalumeau ou sous le grill."
    ]
  },
  {
    id: 5,
    titre: "Fondant au chocolat",
    auteur: "Jean Dupont",
    temps: "40min",
    difficulte: "Intermédiaire",
    notation: 4.9,
    nbAvis: 75,
    ingredients: 5,
    listeIngredients: [
      "200g de chocolat noir", 
      "150g de beurre", 
      "150g de sucre", 
      "4 œufs", 
      "50g de farine"
    ],
    etapes: [
      "Préchauffer le four à 180°C.",
      "Faire fondre le chocolat avec le beurre au bain-marie.",
      "Fouetter les œufs avec le sucre jusqu'à blanchiment.",
      "Incorporer le mélange chocolat-beurre aux œufs.",
      "Ajouter la farine tamisée et mélanger délicatement.",
      "Verser dans un moule beurré et enfourner 12-15 minutes.",
      "Le centre doit rester fondant, surveiller la cuisson."
    ]
  },
];

function CommunauteDesserts() {
  const [expandedRecette, setExpandedRecette] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  
  const handleAccordionChange = (id: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedRecette(isExpanded ? id : null);
  };
  
  const ajouterRecette = async (recette: typeof desserts[0]) => {
    try {
      // Conversion des ingrédients au format attendu par l'API
      const ingredients = recette.listeIngredients.map(ingredient => {
        // Extraction simple du nom et de la quantité à partir de la chaîne
        const match = ingredient.match(/^([\d,\.]+)?([a-zA-Zéèêë ]+)(.*)$/);
        if (match) {
          const quantity = match[1] ? parseFloat(match[1].replace(',', '.')) : 1;
          const name = match[2].trim();
          return {
            name,
            quantity,
            type: ingredientEnum.portion // Type par défaut
          };
        }
        return {
          name: ingredient,
          quantity: 1,
          type: ingredientEnum.portion
        };
      });
      
      // Ajouter au menu et à la recette
      await MenuApi.addMenu(recette.titre);
      await RecipeApi.addRecipe(ingredients, recette.titre);
      
      setSnackbarMessage(`${recette.titre} ajouté à votre collection`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      setSnackbarMessage("Erreur lors de l'ajout de la recette");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box px={4} py={3}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Desserts de la communauté
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Découvrez les desserts créés et partagés par notre communauté
      </Typography>

      <Grid container spacing={3}>
        {desserts.map((dessert) => (
          <Grid item xs={12} sm={12} md={12} key={dessert.id}>
            <Accordion 
              expanded={expandedRecette === dessert.id}
              onChange={handleAccordionChange(dessert.id)}
              sx={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)',
                borderRadius: '12px !important',
                overflow: 'hidden',
                '&::before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: 0,
                  mb: 2,
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="primary" />}
                aria-controls={`panel-${dessert.id}-content`}
                id={`panel-${dessert.id}-header`}
                sx={{
                  backgroundColor: theme => theme.palette.background.paper,
                  borderRadius: '12px',
                  '&.Mui-expanded': {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }
                }}
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" fontWeight="bold">{dessert.titre}</Typography>
                    <Box display="flex" alignItems="center" mt={0.5}>
                      <Rating value={dessert.notation} precision={0.5} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary" ml={1}>
                        ({dessert.nbAvis})
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" flexWrap="wrap" gap={2}>
                      <Box display="flex" alignItems="center">
                        <PersonIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" ml={1}>
                          {dessert.auteur}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" ml={1}>
                          {dessert.temps}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <LocalFireDepartmentIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" ml={1}>
                          {dessert.difficulte}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <RestaurantIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" ml={1}>
                          {dessert.ingredients} ingrédients
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionSummary>
              
              <AccordionDetails sx={{ px: 3, py: 2, backgroundColor: theme => theme.palette.background.default }}>
                <Grid container spacing={3}>
                  {/* Colonne Ingrédients */}
                  <Grid item xs={12} md={4}>
                    <Accordion defaultExpanded sx={{ boxShadow: 'none', bgcolor: 'background.paper', borderRadius: '8px' }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6" fontWeight="bold" color="primary">Ingrédients</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List dense sx={{ pl: 0 }}>
                          {dessert.listeIngredients.map((ingredient, index) => (
                            <ListItem key={index} sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: '30px' }}>
                                <CheckCircleOutlineIcon color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={ingredient} />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  
                  {/* Colonne Préparation */}
                  <Grid item xs={12} md={8}>
                    <Accordion defaultExpanded sx={{ boxShadow: 'none', bgcolor: 'background.paper', borderRadius: '8px' }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6" fontWeight="bold" color="primary">Préparation</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {dessert.etapes.map((etape, index) => (
                            <ListItem key={index} alignItems="flex-start" sx={{ px: 0, mb: 1 }}>
                              <ListItemIcon>
                                <Box 
                                  sx={{ 
                                    width: 24, 
                                    height: 24, 
                                    borderRadius: '50%', 
                                    bgcolor: 'primary.main', 
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  {index + 1}
                                </Box>
                              </ListItemIcon>
                              <ListItemText primary={etape} />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
                
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddToPhotosIcon />}
                    onClick={() => ajouterRecette(dessert)}
                  >
                    Ajouter à ma collection
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
      
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CommunauteDesserts;