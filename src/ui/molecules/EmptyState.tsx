import { Box, Typography, Button, SxProps } from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../theme";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  sx?: SxProps;
  children?: ReactNode;
}

export function EmptyState({ title, description, icon, actionButton, sx, children }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        textAlign: 'center',
        minHeight: '300px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '8px',
        border: `1px solid ${theme.palette.divider}`,
        ...sx
      }}
    >
      {icon && (
        <Box sx={{ mb: 2, color: theme.palette.text.secondary, fontSize: 72 }}>
          {icon}
        </Box>
      )}
      
      {children}
      
      <Typography variant="h5" component="h2" sx={{ 
        mb: 1, 
        fontWeight: 600,
        backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        backgroundClip: 'text',
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        {title}
      </Typography>
      
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ mb: 3, maxWidth: '500px' }}
      >
        {description}
      </Typography>
      
      {actionButton && (
        <Button
          variant="contained"
          onClick={actionButton.onClick}
          sx={{
            py: 1.2,
            px: 3,
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0,118,255,0.23)'
            }
          }}
        >
          {actionButton.label}
        </Button>
      )}
    </Box>
  );
} 