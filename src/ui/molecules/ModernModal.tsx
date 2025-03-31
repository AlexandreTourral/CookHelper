import { 
  Box, 
  Fade, 
  IconButton, 
  Modal, 
  Stack, 
  Typography, 
  useMediaQuery 
} from "@mui/material";
import { theme } from "../theme";
import { useTheme } from "@mui/material/styles";
import { ReactNode } from "react";
import CloseIcon from '@mui/icons-material/Close';

export interface ModernModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: number | string;
  preventBackdropClick?: boolean;
}

export function ModernModal({ 
  open, 
  onClose, 
  title, 
  icon, 
  children, 
  actions,
  maxWidth = 500,
  preventBackdropClick = false
}: ModernModalProps) {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !preventBackdropClick) {
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={preventBackdropClick ? undefined : onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          onClick={handleBackdropClick}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? 2 : 4,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: maxWidth,
              maxHeight: '90vh',
              overflowY: 'auto',
              bgcolor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              p: 0,
              '&:focus': {
                outline: 'none',
              },
            }}
          >
            {/* Barre supérieure avec dégradé */}
            <Box
              sx={{
                height: 6,
                width: '100%',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            />
            
            {/* Bouton de fermeture */}
            <IconButton
              aria-label="fermer"
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                color: theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.05)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            
            {/* Titre de la modal */}
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                {icon && (
                  <Box sx={{ color: theme.palette.primary.main, display: 'flex' }}>
                    {icon}
                  </Box>
                )}
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 600,
                    flex: 1,
                    backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {title}
                </Typography>
              </Stack>
            </Box>
            
            {/* Contenu de la modal */}
            <Box sx={{ p: 3 }}>
              {children}
            </Box>
            
            {/* Actions de la modal */}
            {actions && (
              <Box 
                sx={{ 
                  p: 3, 
                  pt: 0,
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  gap: 2,
                  flexWrap: 'wrap'
                }}
              >
                {actions}
              </Box>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
} 