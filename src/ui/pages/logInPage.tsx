import { useState } from "react";
import { LogInUser } from "../../hooks";
import { Button, TextField, Typography } from "@mui/material";
import { ErrorSnackbar } from "../components";
import { useNavigate } from "react-router-dom";

export function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      await LogInUser(email, password)
      setEmail('')
      setPassword('')
      navigate("/dashboard")
    } catch (e: any) {
      setErrorMessage("L'email ou le mot de passe contient une erreur.")
      setSnackbarOpen(true)
      setPassword('')
      return;
    }
  }
  
  return (
    <div>
      <Typography variant="h2" className="text-center"> Se connecter </Typography>
      <form onSubmit={handleSubmit}>
      <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Mot de passe"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="secondary">
          Valider
        </Button>
        <ErrorSnackbar message={errorMessage} open={snackbarOpen} onClose={() => setSnackbarOpen(false)} />
      </form>
    </div>
  )
}