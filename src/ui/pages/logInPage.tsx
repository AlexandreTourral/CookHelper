import { useState, useEffect } from "react";
import { LogInUser } from "../../hooks";
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  TextField, 
  Typography, 
  InputAdornment, 
  IconButton, 
  Fade,
  CircularProgress,
  useMediaQuery
} from "@mui/material";
import { ErrorSnackbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { updateAuthStore } from "../../store/UserStore";
import { theme } from "../theme";
import { useTheme } from "@mui/material/styles";

export function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await LogInUser(email, password);
      setEmail('');
      setPassword('');
      updateAuthStore(true);
      navigate("/weekook/dashboard");
    } catch (e: any) {
      setErrorMessage("L'email ou le mot de passe contient une erreur.");
      setSnackbarOpen(true);
      setPasswordError(true);
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  }
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const navigateToHomePage = () => {
    navigate("/");
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.light}30, ${theme.palette.secondary.light}30)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 24, 
          left: 24
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={navigateToHomePage}
          sx={{
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Retour
        </Button>
      </Box>

      <Fade in={fadeIn} timeout={800}>
        <Card
          sx={{
            width: isMobile ? '90%' : '450px',
            borderRadius: 4,
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              height: 8,
              width: '100%',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
            }}
          />
          
          <CardContent sx={{ padding: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              align="center"
              sx={{ 
                fontWeight: 700,
                mb: 4,
                backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Connexion
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  }
                }}
              />
              
              <TextField
                label="Mot de passe"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  }
                }}
              />
              
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  transition: 'all 0.3s ease',
                  mb: 3,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,118,255,0.23)'
                  }
                }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Se connecter"}
              </Button>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  mt: 2 
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Vous n'avez pas de compte ?
                </Typography>
                <Link 
                  to="/SignUp" 
                  style={{ 
                    textDecoration: "none", 
                    marginLeft: "8px"
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    S'inscrire
                  </Typography>
                </Link>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Fade>
      
      <ErrorSnackbar message={errorMessage} open={snackbarOpen} onClose={() => setSnackbarOpen(false)} />
    </Box>
  );
}