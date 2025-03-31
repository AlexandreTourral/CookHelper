import { AppBar, IconButton, Toolbar, Typography, useMediaQuery, useTheme as useMuiTheme, Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthStore } from "../../store/UserStore";
import { useObservable } from "@ngneat/react-rxjs";
import { theme } from "../theme";
import { logOutUser } from "../../hooks/logOutUser";
import MenuIcon from '@mui/icons-material/Menu';
import { toggleSidebar } from "../../store/SideBarStore";

export function NavBar() {
  const user = useObservable(AuthStore);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const handleLogOut = () => {
    logOutUser();
    window.location.reload();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "none",
        borderBottom: `1px solid ${theme.palette.secondary.main}`,
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ minHeight: "64px !important" }}>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            sx={{
              mr: 2,
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.primary.main + '10',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: theme.palette.text.primary,
            fontWeight: 600,
          }}
        >
          WeeKooK
        </Typography>
        {user[0].user?.isConnected && (
          <Button
            onClick={handleLogOut}
            startIcon={<LogoutIcon />}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.error.main + '10',
                color: theme.palette.error.main,
              },
            }}
          >
            Se déconnecter
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}