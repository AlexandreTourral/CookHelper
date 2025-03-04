import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#e8dcc7', // Crème chaud
    },
    secondary: {
      main: '#d4c4a5', // Beige plus foncé
    },
    background: {
      default: '#f5efe3', // Fond général crème
      paper: '#ede3d2', // Fond des cartes et surfaces élevées
    },
    text: {
      primary: '#4a3f35', // Brun doux pour le contraste
      secondary: '#6d5b4b', // Brun plus clair
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
};

export const theme = createTheme(themeOptions);
