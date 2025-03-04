import { useTheme } from "@emotion/react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export function NavBar() {
  const theme = useTheme();

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
      </Toolbar>
    </AppBar>
  )
}