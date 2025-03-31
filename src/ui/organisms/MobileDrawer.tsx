import { Box, Drawer, IconButton, Stack, Typography, useMediaQuery, useTheme as useMuiTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useObservable } from "@ngneat/react-rxjs";
import { SidebarState, closeSidebar } from "../../store/SideBarStore";
import { theme } from "../theme";
import CloseIcon from '@mui/icons-material/Close';

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CollectionsIcon from '@mui/icons-material/Collections';

const menuItems = [
  { 
    icon: <SpaceDashboardIcon />, 
    label: "Dashboard", 
    path: "dashboard" 
  },
  { 
    icon: <RestaurantMenuIcon />, 
    label: "Menu", 
    path: "menu" 
  },
  { 
    icon: <CalendarMonthIcon />, 
    label: "Planning", 
    path: "planning" 
  },
  { 
    icon: <MenuBookIcon />, 
    label: "Recettes", 
    path: "recettes" 
  },
  { 
    icon: <CollectionsIcon />, 
    label: "Collection", 
    path: "collection" 
  },
];

export function MobileDrawer() {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarState = useObservable(SidebarState)[0];
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  // Si l'appareil n'est pas mobile, on ne rend pas le drawer
  if (!isMobile) {
    return null;
  }

  const handleNavigation = (path: string) => {
    navigate(path);
    closeSidebar();
  };

  return (
    <Drawer
      anchor="left"
      open={sidebarState.isOpen}
      onClose={closeSidebar}
      sx={{
        '& .MuiDrawer-paper': {
          width: '280px',
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ position: 'relative', height: '100%', pt: 2, pb: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          px: 2,
          mb: 2,
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            WeeKooK
          </Typography>
          <IconButton
            onClick={closeSidebar}
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack spacing={0.5} sx={{ padding: "8px 16px" }}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Box
                key={index}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  transition: "all 0.2s ease",
                  backgroundColor: isActive ? theme.palette.primary.main + '20' : 'transparent',
                  color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: isActive ? theme.palette.primary.main + '30' : theme.palette.primary.main + '10',
                  },
                }}
              >
                <Stack 
                  direction="row" 
                  spacing={2} 
                  alignItems="center"
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '24px' }}>
                    {item.icon}
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Drawer>
  );
} 