import { useState } from "react";
import { Box, Button, Card, CardContent, Grid, Rating, Typography, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

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
  const [recetteOuverte, setRecetteOuverte] = useState<number | null>(null);
  
  const ouvrirRecette = (id: number) => {
    setRecetteOuverte(id);
  };
  
  const fermerRecette = () => {
    setRecetteOuverte(null);
  };
  
  const recetteSelectionnee = platsPrincipaux.find(plat => plat.id === recetteOuverte);

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
          <Grid item xs={12} sm={6} md={4} key={plat.id}>
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
                  {plat.titre}
                </Typography>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <PersonIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {plat.auteur}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <AccessTimeIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {plat.temps}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <LocalFireDepartmentIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {plat.difficulte}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <RestaurantIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {plat.ingredients} ingrédients
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={2}>
                  <Rating value={plat.notation} precision={0.5} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    ({plat.nbAvis} avis)
                  </Typography>
                </Box>
                
                <Paper variant="outlined" sx={{ p: 1.5, mb: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" gutterBottom color="primary">
                    Ingrédients principaux:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {plat.listeIngredients.slice(0, 3).join(', ')}...
                  </Typography>
                </Paper>
                
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<VisibilityIcon />}
                  fullWidth
                  onClick={() => ouvrirRecette(plat.id)}
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

export default CommunautePlatsPrincipaux; 