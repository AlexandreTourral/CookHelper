import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="flex flex-col">
      <Typography variant="h5">
        Hello bienvenue sur ma page d'acceuil
      </Typography>
      <div className="flex flex-row gap-4 mt-4 justify-center">
      <Link to="/SignUp" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          SignUp
        </Button>
      </Link>
      <Link to="/LogIn" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          LogIn
        </Button>
      </Link>
      </div>
    </div>
  )
}