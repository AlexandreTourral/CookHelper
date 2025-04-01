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

const platsPrincipaux = [
  {
    id: 1,
    titre: "Bœuf Bourguignon",
    auteur: "Jean Dupont",
    temps: "2h30",
    difficulte: "Intermédiaire",
    notation: 4.7,
    nbAvis: 58,
    ingredients: 12,
    listeIngredients: [
      "1kg de bœuf à braiser (paleron, macreuse)",
      "200g de lardons",
      "2 oignons",
      "2 carottes",
      "200g de champignons de Paris",
      "75cl de vin rouge (Bourgogne)",
      "2 gousses d'ail",
      "1 bouquet garni",
      "2 cuillères à soupe de farine",
      "30g de beurre",
      "2 cuillères à soupe d'huile d'olive",
      "Sel et poivre"
    ],
    etapes: [
      "Couper la viande en cubes de 3-4 cm et la faire mariner dans le vin rouge pendant 2 heures minimum.",
      "Faire revenir les lardons dans une cocotte, puis les réserver.",
      "Faire dorer les morceaux de viande égouttés dans la même cocotte avec l'huile d'olive.",
      "Ajouter les oignons émincés et les carottes coupées en rondelles, faire revenir 5 minutes.",
      "Saupoudrer de farine, bien mélanger et laisser roussir légèrement.",
      "Verser le vin de la marinade, ajouter l'ail écrasé et le bouquet garni.",
      "Saler, poivrer et laisser mijoter à couvert pendant 2 heures à feu doux.",
      "15 minutes avant la fin de la cuisson, faire revenir les champignons dans le beurre et les ajouter au plat.",
      "Vérifier l'assaisonnement et servir bien chaud, idéalement avec des pommes de terre."
    ]
  },
  {
    id: 2,
    titre: "Lasagnes à la bolognaise",
    auteur: "Sophie Martin",
    temps: "1h45",
    difficulte: "Intermédiaire",
    notation: 4.9,
    nbAvis: 85,
    ingredients: 10,
    listeIngredients: [
      "500g de viande hachée (bœuf)",
      "1 paquet de pâtes à lasagne",
      "2 oignons",
      "2 gousses d'ail",
      "800g de tomates concassées",
      "70cl de béchamel",
      "150g de gruyère râpé",
      "2 cuillères à soupe de concentré de tomate",
      "2 cuillères à soupe d'huile d'olive",
      "Herbes de Provence, sel et poivre"
    ],
    etapes: [
      "Préchauffer le four à 180°C.",
      "Préparer la sauce bolognaise : faire revenir les oignons émincés dans l'huile d'olive.",
      "Ajouter la viande hachée et faire revenir jusqu'à ce qu'elle soit bien dorée.",
      "Ajouter l'ail écrasé, le concentré de tomate, les tomates concassées et les herbes.",
      "Saler, poivrer et laisser mijoter à feu doux 30 minutes.",
      "Dans un plat à gratin, disposer une fine couche de béchamel, puis des plaques de lasagne.",
      "Alterner des couches de sauce bolognaise, béchamel, fromage râpé et lasagnes.",
      "Terminer par une couche de béchamel généreusement recouverte de fromage râpé.",
      "Enfourner pour 30-35 minutes jusqu'à ce que le dessus soit bien doré.",
      "Laisser reposer 10 minutes avant de servir."
    ]
  },
  {
    id: 3,
    titre: "Coq au vin",
    auteur: "Pierre Lefebvre",
    temps: "2h",
    difficulte: "Difficile",
    notation: 4.6,
    nbAvis: 45,
    ingredients: 14,
    listeIngredients: [
      "1 poulet fermier découpé en morceaux",
      "200g de lardons",
      "20 petits oignons grelots",
      "250g de champignons de Paris",
      "75cl de vin rouge (Bourgogne)",
      "10cl de cognac",
      "2 gousses d'ail",
      "1 bouquet garni",
      "2 cuillères à soupe de farine",
      "30g de beurre",
      "2 cuillères à soupe d'huile",
      "25cl de bouillon de volaille",
      "Sel et poivre",
      "1 cuillère à soupe de persil haché"
    ],
    etapes: [
      "Faire mariner le poulet dans le vin rouge avec les aromates pendant 12 heures au réfrigérateur.",
      "Égoutter les morceaux de poulet et les sécher (conserver la marinade).",
      "Faire dorer les lardons dans une cocotte, puis les réserver.",
      "Dans la même cocotte, faire dorer les morceaux de poulet avec l'huile.",
      "Flamber avec le cognac.",
      "Saupoudrer de farine, bien mélanger et faire roussir légèrement.",
      "Ajouter les oignons grelots, l'ail écrasé et le bouquet garni.",
      "Verser le vin de la marinade et le bouillon de volaille.",
      "Saler, poivrer et laisser mijoter à couvert pendant 1h30 à feu doux.",
      "Faire revenir les champignons dans le beurre et les ajouter en fin de cuisson.",
      "Rectifier l'assaisonnement, saupoudrer de persil et servir chaud."
    ]
  },
  {
    id: 4,
    titre: "Ratatouille",
    auteur: "Marie Dubois",
    temps: "1h15",
    difficulte: "Facile",
    notation: 4.4,
    nbAvis: 37,
    ingredients: 7,
    listeIngredients: [
      "2 aubergines",
      "3 courgettes",
      "2 poivrons (1 rouge, 1 jaune)",
      "800g de tomates mûres",
      "2 oignons",
      "3 gousses d'ail",
      "Huile d'olive, herbes de Provence, sel, poivre"
    ],
    etapes: [
      "Laver et couper tous les légumes en cubes d'environ 2 cm.",
      "Faire dégorger les aubergines avec du sel pendant 30 minutes, puis les rincer et les sécher.",
      "Dans une grande cocotte, faire revenir les oignons émincés dans l'huile d'olive.",
      "Ajouter les poivrons et les faire revenir 5 minutes.",
      "Ajouter les aubergines et les courgettes, poursuivre la cuisson pendant 10 minutes.",
      "Incorporer les tomates concassées, l'ail écrasé et les herbes de Provence.",
      "Saler, poivrer et laisser mijoter à couvert pendant 40 minutes à feu doux.",
      "La ratatouille doit être bien cuite mais les légumes doivent rester reconnaissables.",
      "Servir chaud ou froid, selon les préférences."
    ]
  },
  {
    id: 5,
    titre: "Blanquette de veau",
    auteur: "Luc Bernard",
    temps: "2h15",
    difficulte: "Intermédiaire",
    notation: 4.8,
    nbAvis: 62,
    ingredients: 13,
    listeIngredients: [
      "1,2kg d'épaule de veau",
      "2 carottes",
      "1 oignon piqué de 2 clous de girofle",
      "1 blanc de poireau",
      "1 branche de céleri",
      "250g de champignons de Paris",
      "1 bouquet garni",
      "50g de beurre",
      "40g de farine",
      "20cl de crème fraîche",
      "1 jaune d'œuf",
      "Jus de citron",
      "Sel et poivre"
    ],
    etapes: [
      "Couper la viande en morceaux de 4-5 cm.",
      "Mettre la viande dans une cocotte, couvrir d'eau froide et porter à ébullition.",
      "Écumer soigneusement, puis ajouter les légumes coupés en morceaux et le bouquet garni.",
      "Saler légèrement, couvrir et laisser mijoter 1h30 à petit feu.",
      "Pendant ce temps, nettoyer et couper les champignons en quartiers.",
      "Les faire revenir dans un peu de beurre et réserver.",
      "Préparer un roux : faire fondre le beurre dans une casserole, ajouter la farine et remuer jusqu'à obtenir une pâte blonde.",
      "Filtrer 1 litre de bouillon de cuisson et l'ajouter progressivement au roux en fouettant pour éviter les grumeaux.",
      "Laisser cuire cette sauce 10 minutes à feu doux en remuant régulièrement.",
      "Égoutter les morceaux de viande et les légumes, les mettre dans la sauce avec les champignons.",
      "Laisser mijoter encore 15 minutes.",
      "Hors du feu, lier la sauce avec la crème et le jaune d'œuf battus ensemble, ajouter quelques gouttes de jus de citron.",
      "Servir bien chaud avec du riz."
    ]
  },
];

function CommunautePlatsPrincipaux() {
  const [expandedRecette, setExpandedRecette] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  
  const handleAccordionChange = (id: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedRecette(isExpanded ? id : null);
  };
  
  const ajouterRecette = async (recette: typeof platsPrincipaux[0]) => {
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
        Plats principaux de la communauté
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Découvrez les plats principaux créés et partagés par notre communauté
      </Typography>

      <Grid container spacing={3}>
        {platsPrincipaux.map((plat) => (
          <Grid item xs={12} sm={12} md={12} key={plat.id}>
            <Accordion 
              expanded={expandedRecette === plat.id}
              onChange={handleAccordionChange(plat.id)}
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
                aria-controls={`panel-${plat.id}-content`}
                id={`panel-${plat.id}-header`}
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
                    <Typography variant="h6" fontWeight="bold">{plat.titre}</Typography>
                    <Box display="flex" alignItems="center" mt={0.5}>
                      <Rating value={plat.notation} precision={0.5} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary" ml={1}>
                        ({plat.nbAvis} avis)
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" flexWrap="wrap" gap={2}>
                      <Box display="flex" alignItems="center">
                        <PersonIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" ml={1}>
                          {plat.auteur}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" ml={1}>
                          {plat.temps}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <LocalFireDepartmentIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" ml={1}>
                          {plat.difficulte}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <RestaurantIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" ml={1}>
                          {plat.ingredients} ingrédients
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
                          {plat.listeIngredients.map((ingredient, index) => (
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
                          {plat.etapes.map((etape, index) => (
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
                    onClick={() => ajouterRecette(plat)}
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

export default CommunautePlatsPrincipaux; 