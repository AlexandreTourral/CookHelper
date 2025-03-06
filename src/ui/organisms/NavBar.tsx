
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthStore } from "../../store/UserStore";
import { useObservable } from "@ngneat/react-rxjs";
import { theme } from "../theme";

export function NavBar() {
  const user = useObservable(AuthStore, (state) => state.user);

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "none",
        borderBottom: `1px solid ${theme.palette.secondary.main}`,
      }}
    >
      <Toolbar className="flex justify-between items-center px-4">
        <img src="/assets/CookHelper_logo.webp" alt="Logo" className="h-12" />
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.text.primary,
          }}
        >
          WeeKooK
        </Typography>
        { user[0].user?.isConnected
          ? <Button color="inherit" onClick={handleLogOut}>
              <LogoutIcon />
            </Button>
          : null
        } 
      </Toolbar>
    </AppBar>
  )
}