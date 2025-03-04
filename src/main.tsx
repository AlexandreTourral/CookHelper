import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';
import App from './App.tsx';
import { FirebaseProvider } from './context/firebaseContext.tsx';
import { CssBaseline } from '@mui/material';
import "./index.css"
import { theme } from './ui/theme/theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </ThemeProvider>
  </StrictMode>,
)
