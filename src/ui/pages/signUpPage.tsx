import { useState } from "react";
import { signUpUser } from "../../hooks";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { updateAuthStore } from "../../store/UserStore";

export function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      if (password !== confirmPassword) {
        setConfirmPasswordError(true)
        setPasswordError(true)
        throw "le mot de passe n'est pas le même."
      }
      signUpUser(email, password)
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      updateAuthStore(true)
      navigate("/dashboard")
    } catch (e: any) {
      console.error(e)
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
          Inscription
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
              <TextField
              label="Confirmer le mot de passe"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              error={confirmPasswordError}
              required
              />
            <Button type="submit" variant="contained" color="secondary" sx={{  alignSelf: "end" }}>
              Valider
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  )
}