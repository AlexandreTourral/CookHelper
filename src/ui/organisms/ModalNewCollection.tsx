import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { theme } from "../theme";
import { useState, useEffect } from "react";
import { ModernModal } from "../molecules";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { useTheme } from "@mui/material/styles";

type ModalNewCollectionProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export function ModalNewCollection({ open, onClose, onSubmit }: ModalNewCollectionProps) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  
  // Réinitialiser le formulaire à chaque ouverture
  useEffect(() => {
    if (open) {
      setName("");
    }
  }, [open]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    try {
      setIsSubmitting(true);
      await onSubmit(name);
      setName("");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    setName("");
    onClose();
  };

  return (
    <ModernModal
      open={open}
      onClose={onClose}
      title="Ajouter une collection"
      icon={<CollectionsBookmarkIcon sx={{ fontSize: 28 }} />}
      maxWidth={450}
      actions={
        <>
          <Button 
            variant="outlined" 
            onClick={handleCancel}
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
            disabled={!name.trim() || isSubmitting}
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
            {isSubmitting ? "Ajout en cours..." : "Ajouter"}
          </Button>
        </>
      }
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <TextField
          label="Nom de la collection"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
          InputProps={{
            sx: {
              borderRadius: 1.5,
            }
          }}
          sx={{
            mb: 2,
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
        
        <Box 
          sx={{ 
            mt: 3, 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            p: 2,
            bgcolor: 'rgba(0,0,0,0.02)',
            borderRadius: 2,
            border: '1px dashed rgba(0,0,0,0.1)'
          }}
        >
          <CollectionsBookmarkIcon sx={{ color: theme.palette.text.secondary }} />
          <Box component="span" sx={{ color: theme.palette.text.secondary, fontSize: '0.9rem', textAlign: 'center' }}>
            Les collections vous permettent d'organiser vos recettes préférées par catégorie.
          </Box>
        </Box>
      </Box>
    </ModernModal>
  );
}