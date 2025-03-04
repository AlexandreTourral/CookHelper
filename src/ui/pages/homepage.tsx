import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="flex flex-col gap-10 mr-20 ml-20">
      <Typography variant="h3" sx={{ alignSelf: "center", marginTop: "2.5rem" }}>
        🥗 Weekook - Planifiez vos repas en un clic ! 🍽️
      </Typography>
      <img src="/assets/meal_plan.png" className="w-200 self-center" />
      <Typography variant="h5" sx={{ alignSelf: "center" }}>
        Gagnez du temps et simplifiez votre quotidien grâce à une planification automatique de vos repas pour la semaine.
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