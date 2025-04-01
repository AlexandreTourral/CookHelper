import { useState } from "react";
import { Box, Button, Card, CardContent, Grid, Rating, Typography, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

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
  const [recetteOuverte, setRecetteOuverte] = useState<number | null>(null);
  
  const ouvrirRecette = (id: number) => {
    setRecetteOuverte(id);
  };
  
  const fermerRecette = () => {
    setRecetteOuverte(null);
  };
  
  const recetteSelectionnee = entrees.find(entree => entree.id === recetteOuverte);

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
          <Grid item xs={12} sm={6} md={4} key={entree.id}>
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
                  {entree.titre}
                </Typography>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <PersonIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {entree.auteur}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <AccessTimeIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {entree.temps}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <LocalFireDepartmentIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {entree.difficulte}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <RestaurantIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {entree.ingredients} ingrédients
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" mb={2}>
                  <Rating value={entree.notation} precision={0.5} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    ({entree.nbAvis})
                  </Typography>
                </Box>
                
                <Paper variant="outlined" sx={{ p: 1.5, mb: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" gutterBottom color="primary">
                    Ingrédients principaux:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {entree.listeIngredients.slice(0, 3).join(', ')}...
                  </Typography>
                </Paper>
                
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<VisibilityIcon />}
                  fullWidth
                  onClick={() => ouvrirRecette(entree.id)}
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

export default CommunauteEntrees; 