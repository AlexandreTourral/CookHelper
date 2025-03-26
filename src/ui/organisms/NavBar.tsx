
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthStore } from "../../store/UserStore";
import { useObservable } from "@ngneat/react-rxjs";
import { theme } from "../theme";
import { logOutUser } from "../../hooks/logOutUser";
import DehazeIcon from '@mui/icons-material/Dehaze';
import { updateSidebarStatus } from "../../store/SideBarStore";

export function NavBar() {
  const user = useObservable(AuthStore);

  const handleLogOut = () => {
    logOutUser()
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
        <Button onClick={updateSidebarStatus}>
          <DehazeIcon sx={{ color: theme.palette.text.primary }} />
        </Button>
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