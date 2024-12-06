import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div>
      Hello bienvenue sur ma page d'acceuil
      <Link to="/SignUp" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          SignUp
        </Button>
      </Link>
    </div>
  )
}