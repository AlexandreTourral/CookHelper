import { useState } from "react";
import { Box, Button, Card, CardContent, Grid, Rating, Typography, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

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
  const [recetteOuverte, setRecetteOuverte] = useState<number | null>(null);
  
  const ouvrirRecette = (id: number) => {
    setRecetteOuverte(id);
  };
  
  const fermerRecette = () => {
    setRecetteOuverte(null);
  };
  
  const recetteSelectionnee = desserts.find(dessert => dessert.id === recetteOuverte);

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
          <Grid item xs={12} sm={6} md={4} key={dessert.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
                  {dessert.titre}
                </Typography>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <PersonIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {dessert.auteur}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <AccessTimeIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {dessert.temps}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <LocalFireDepartmentIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {dessert.difficulte}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <RestaurantIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {dessert.ingredients} ingrédients
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={2}>
                  <Rating value={dessert.notation} precision={0.5} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    ({dessert.nbAvis})
                  </Typography>
                </Box>
                
                <Paper variant="outlined" sx={{ p: 1.5, mb: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" gutterBottom color="primary">
                    Ingrédients principaux:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dessert.listeIngredients.slice(0, 3).join(', ')}...
                  </Typography>
                </Paper>
                
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<VisibilityIcon />}
                  fullWidth
                  onClick={() => ouvrirRecette(dessert.id)}
                >
                  Voir la recette complète
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Modal affichant les détails de la recette */}
      <Dialog 
        open={recetteOuverte !== null} 
        onClose={fermerRecette}
        maxWidth="md"
        fullWidth
      >
        {recetteSelectionnee && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" component="div" fontWeight="bold">
                {recetteSelectionnee.titre}
              </Typography>
              <Button
                onClick={fermerRecette}
                color="inherit"
                sx={{ minWidth: 'auto', p: 1 }}
              >
                <CloseIcon />
              </Button>
            </DialogTitle>
            
            <DialogContent dividers>
              <Box mb={3}>
                <Box display="flex" alignItems="center" mb={1}>
                  <PersonIcon fontSize="small" color="primary" />
                  <Typography variant="body1" ml={1}>
                    Par {recetteSelectionnee.auteur}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <AccessTimeIcon fontSize="small" color="primary" />
                  <Typography variant="body1" ml={1}>
                    Temps de préparation: {recetteSelectionnee.temps}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <LocalFireDepartmentIcon fontSize="small" color="primary" />
                  <Typography variant="body1" ml={1}>
                    Difficulté: {recetteSelectionnee.difficulte}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <Rating value={recetteSelectionnee.notation} precision={0.5} readOnly />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    ({recetteSelectionnee.nbAvis} avis)
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Ingrédients
              </Typography>
              <Box mb={3}>
                <List dense>
                  {recetteSelectionnee.listeIngredients.map((ingredient, index) => (
                    <ListItem key={index}>
                      <ListItemIcon sx={{ minWidth: '30px' }}>
                        <CheckCircleOutlineIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={ingredient} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Préparation
              </Typography>
              <List>
                {recetteSelectionnee.etapes.map((etape, index) => (
                  <ListItem key={index} alignItems="flex-start">
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
            </DialogContent>
            
            <DialogActions>
              <Button onClick={fermerRecette} color="primary">
                Fermer
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default CommunauteDesserts;