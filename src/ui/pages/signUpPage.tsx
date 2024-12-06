import { useState } from "react";
import { signUpUser } from "../../hooks";
import { Button, TextField } from "@mui/material";

export function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      signUpUser(email, password)
      setEmail('')
      setPassword('')
    } catch (e: any) {
      console.error(e.message)
    }
  }
  
  return (
    <div>
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
      </form>
    </div>
  )
}