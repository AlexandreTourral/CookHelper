import { useState } from "react";
import { LogInUser } from "../../hooks";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { ErrorSnackbar } from "../components";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { updateAuthStore } from "../../store/UserStore";

export function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      await LogInUser(email, password)
      setEmail('')
      setPassword('')
      updateAuthStore(true)
      navigate("/weekook/dashboard")
    } catch (e: any) {
      setErrorMessage("L'email ou le mot de passe contient une erreur.")
      setSnackbarOpen(true)
      setPasswordError(true)
      setPassword('')
      return;
    }
  }
  
  const navigationToHomePage = () => {
    navigate("/")
  }

  return (
    <Box sx={{ padding: "16px" }}>
      <Box 
        onClick={navigationToHomePage} 
        sx={{ display: "inline-flex", alignItems: "center", gap: 1, cursor: "pointer", height: "16px" }}
      >
        <ArrowBackIcon />
        <Typography variant="body1">
          Retour
        </Typography>
      </Box>
      <Stack direction="column" width={1} sx={{ alignItems: "center" }}>
        <Typography variant="h4" sx={{ justifySelf: "center", marginTop: "16px", marginBottom: "32px" }}>
          Se connecter
        </Typography>
        <form onSubmit={handleSubmit} className="w-full">
          <Stack direction="column" sx={{ marginLeft: "30%", marginRight: "30%" }}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              />
            <TextField
              label="Mot de passe"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              error={passwordError}
              required
              />
            <Button type="submit" variant="contained" color="secondary" sx={{  alignSelf: "end" }}>
              Valider
            </Button>
          </Stack>
        </form>
      </Stack>
      <ErrorSnackbar message={errorMessage} open={snackbarOpen} onClose={() => setSnackbarOpen(false)} />
    </Box>
  )
}