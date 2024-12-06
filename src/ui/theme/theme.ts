import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Bleu par défaut
    },
    secondary: {
      main: '#dc004e', // Rouge par défaut
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

