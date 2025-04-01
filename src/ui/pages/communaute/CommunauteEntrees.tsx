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

const entrees = [
  {
    id: 1,
    titre: "Salade niçoise",
    auteur: "Sophie Martin",
    temps: "20min",
    difficulte: "Facile",
    notation: 4.5,
    nbAvis: 42,
    ingredients: 8,
    listeIngredients: [
      "200g de thon en conserve",
      "4 tomates", 
      "2 œufs durs",
      "1 poivron vert",
      "100g d'olives noires",
      "1 oignon rouge",
      "200g de haricots verts",
      "Vinaigrette (huile d'olive, vinaigre, sel, poivre)"
    ],
    etapes: [
      "Faire cuire les haricots verts à l'eau bouillante pendant 10 minutes, puis les passer sous l'eau froide.",
      "Cuire les œufs durs (10 minutes dans l'eau bouillante).",
      "Couper les tomates en quartiers, le poivron en lanières et l'oignon en rondelles fines.",
      "Égoutter le thon et l'émietter.",
      "Écaler les œufs et les couper en quartiers.",
      "Disposer tous les ingrédients dans un saladier.",
      "Assaisonner avec la vinaigrette et servir frais."
    ]
  },
  {
    id: 2,
    titre: "Velouté de potiron",
    auteur: "Jean Dupont",
    temps: "35min",
    difficulte: "Facile",
    notation: 4.7,
    nbAvis: 56,
    ingredients: 6,
    listeIngredients: [
      "800g de potiron",
      "2 pommes de terre",
      "1 oignon",
      "1 gousse d'ail",
      "75cl de bouillon de volaille",
      "10cl de crème fraîche"
    ],
    etapes: [
      "Éplucher et couper le potiron, les pommes de terre et l'oignon en morceaux.",
      "Faire revenir l'oignon dans une cocotte avec un peu d'huile d'olive.",
      "Ajouter l'ail écrasé, le potiron et les pommes de terre. Faire revenir 5 minutes.",
      "Verser le bouillon, saler et poivrer.",
      "Laisser cuire à feu doux environ 25 minutes jusqu'à ce que les légumes soient tendres.",
      "Mixer finement et ajouter la crème fraîche.",
      "Servir chaud avec éventuellement des croûtons."
    ]
  },
  {
    id: 3,
    titre: "Tartare de saumon",
    auteur: "Marie Lambert",
    temps: "25min",
    difficulte: "Intermédiaire",
    notation: 4.8,
    nbAvis: 35,
    ingredients: 7,
    listeIngredients: [
      "300g de saumon frais",
      "1 échalote",
      "1 citron",
      "2 cuillères à soupe d'aneth ciselé",
      "1 cuillère à soupe de câpres",
      "2 cuillères à soupe d'huile d'olive",
      "Sel et poivre"
    ],
    etapes: [
      "Découper le saumon en petits dés, le placer dans un bol.",
      "Ciseler finement l'échalote et l'ajouter au saumon.",
      "Presser le citron et en verser le jus sur le mélange.",
      "Ajouter l'aneth ciselé, les câpres et l'huile d'olive.",
      "Saler et poivrer selon votre goût.",
      "Mélanger délicatement et laisser mariner au réfrigérateur 15 minutes.",
      "Servir frais, éventuellement avec des tranches de pain grillé."
    ]
  },
  {
    id: 4,
    titre: "Quiche lorraine",
    auteur: "Pierre Lefebvre",
    temps: "45min",
    difficulte: "Intermédiaire",
    notation: 4.6,
    nbAvis: 48,
    ingredients: 9,
    listeIngredients: [
      "1 pâte brisée",
      "200g de lardons",
      "200g de gruyère râpé",
      "4 œufs",
      "20cl de crème fraîche",
      "20cl de lait",
      "1 oignon",
      "Muscade",
      "Sel et poivre"
    ],
    etapes: [
      "Préchauffer le four à 180°C.",
      "Étaler la pâte dans un moule à tarte et la piquer à la fourchette.",
      "Faire revenir les lardons et l'oignon émincé dans une poêle.",
      "Battre les œufs avec la crème et le lait.",
      "Ajouter le gruyère râpé, les lardons et l'oignon au mélange.",
      "Assaisonner avec sel, poivre et muscade.",
      "Verser la préparation sur la pâte.",
      "Enfourner pour 30-35 minutes jusqu'à ce que la quiche soit dorée.",
      "Servir tiède ou froid avec une salade verte."
    ]
  },
  {
    id: 5,
    titre: "Soupe à l'oignon",
    auteur: "Lucie Dubois",
    temps: "40min",
    difficulte: "Facile",
    notation: 4.4,
    nbAvis: 39,
    ingredients: 5,
    listeIngredients: [
      "4 gros oignons",
      "1L de bouillon de bœuf",
      "50g de beurre",
      "100g de gruyère râpé",
      "Tranches de pain de campagne"
    ],
    etapes: [
      "Émincer finement les oignons.",
      "Les faire revenir dans le beurre à feu doux jusqu'à ce qu'ils soient bien dorés (environ 15-20 minutes).",
      "Ajouter le bouillon de bœuf et laisser mijoter 15 minutes.",
      "Faire griller les tranches de pain.",
      "Servir la soupe dans des bols, déposer une tranche de pain grillé sur chaque bol.",
      "Saupoudrer de gruyère râpé et passer sous le grill du four quelques minutes jusqu'à ce que le fromage soit fondu et doré."
    ]
  },
];

function CommunauteEntrees() {
  const [expandedRecette, setExpandedRecette] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  
  const handleAccordionChange = (id: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedRecette(isExpanded ? id : null);
  };
  
  const ajouterRecette = async (recette: typeof entrees[0]) => {
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
        Entrées de la communauté
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Découvrez les entrées créées et partagées par notre communauté
      </Typography>

      <Grid container spacing={3}>
        {entrees.map((entree) => (
          <Grid item xs={12} sm={12} md={12} key={entree.id}>
            <Accordion 
              expanded={expandedRecette === entree.id}
              onChange={handleAccordionChange(entree.id)}
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
                aria-controls={`panel-${entree.id}-content`}
                id={`panel-${entree.id}-header`}
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
                    <Typography variant="h6" fontWeight="bold">{entree.titre}</Typography>
                    <Box display="flex" alignItems="center" mt={0.5}>
                      <Rating value={entree.notation} precision={0.5} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary" ml={1}>
                        ({entree.nbAvis})
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" flexWrap="wrap" gap={2}>
                      <Box display="flex" alignItems="center">
                        <PersonIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" ml={1}>
                          {entree.auteur}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" ml={1}>
                          {entree.temps}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <LocalFireDepartmentIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" ml={1}>
                          {entree.difficulte}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <RestaurantIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" ml={1}>
                          {entree.ingredients} ingrédients
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
                          {entree.listeIngredients.map((ingredient, index) => (
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
                          {entree.etapes.map((etape, index) => (
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
                    onClick={() => ajouterRecette(entree)}
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

export default CommunauteEntrees; 