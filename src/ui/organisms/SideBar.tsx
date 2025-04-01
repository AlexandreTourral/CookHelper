import { Box, Collapse, IconButton, Stack, Tooltip, Typography, useMediaQuery, useTheme as useMuiTheme } from "@mui/material";
import { theme } from "../theme";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CollectionsIcon from '@mui/icons-material/Collections';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import CakeIcon from '@mui/icons-material/Cake';
import GroupIcon from '@mui/icons-material/Group';

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

const communauteItems = [
  {
    icon: <DinnerDiningIcon fontSize="small" />,
    label: "Plats Principaux",
    path: "/weekook/communaute/plats-principaux"
  },
  {
    icon: <SoupKitchenIcon fontSize="small" />,
    label: "Entrées",
    path: "/weekook/communaute/entrees"
  },
  {
    icon: <CakeIcon fontSize="small" />,
    label: "Desserts",
    path: "/weekook/communaute/desserts"
  }
];

interface SideBarProps {
  onExpandChange?: (expanded: boolean) => void;
}

export function SideBar({ onExpandChange }: SideBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const [communauteOpen, setCommunauteOpen] = useState(false);

  // Vérifier si l'un des chemins de communauté est actif
  const isCommunauteActive = communauteItems.some(item => location.pathname === item.path);

  useEffect(() => {
    if (isMobile) {
      setExpanded(false);
    }
  }, [isMobile]);

  // Si un chemin de communauté est actif, ouvrir automatiquement le groupe
  useEffect(() => {
    if (isCommunauteActive) {
      setCommunauteOpen(true);
    }
  }, [isCommunauteActive]);

  // Notify parent component when expanded state changes
  useEffect(() => {
    if (onExpandChange) {
      onExpandChange(expanded);
    }
  }, [expanded, onExpandChange]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleCommunaute = () => {
    setCommunauteOpen(!communauteOpen);
  };

  // Si l'écran est mobile, on ne rend pas la sidebar fixe
  if (isMobile) {
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "0 8px 8px 0",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        paddingTop: "70px", // Pour laisser de l'espace à la navbar
        zIndex: 1000,
        transition: "all 0.3s ease",
        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: expanded ? "240px" : "70px",
        overflow: "hidden",
      }}
    >
      <Stack spacing={0.5} sx={{ padding: "16px 8px" }}>
        {menuItems.map((item, index) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <Box
              key={index}
              onClick={() => handleNavigation(item.path)}
              sx={{
                cursor: "pointer",
                borderRadius: "8px",
                padding: "10px 12px",
                transition: "all 0.2s ease",
                backgroundColor: isActive ? theme.palette.primary.main + '20' : 'transparent',
                color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: isActive ? theme.palette.primary.main + '30' : theme.palette.primary.main + '10',
                  transform: "translateX(5px)",
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
                <Collapse orientation="horizontal" in={expanded} collapsedSize={0}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: isActive ? 600 : 400,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Collapse>
              </Stack>
            </Box>
          );
        })}

        {/* Section Communauté avec collapsible */}
        <Box 
          onClick={toggleCommunaute}
          sx={{
            cursor: "pointer",
            borderRadius: "8px",
            padding: "10px 12px",
            transition: "all 0.2s ease",
            backgroundColor: isCommunauteActive ? theme.palette.primary.main + '20' : 'transparent',
            color: isCommunauteActive ? theme.palette.primary.main : theme.palette.text.primary,
            '&:hover': {
              backgroundColor: isCommunauteActive ? theme.palette.primary.main + '30' : theme.palette.primary.main + '10',
              transform: "translateX(5px)",
            },
          }}
        >
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '24px' }}>
                <GroupIcon />
              </Box>
              {expanded && (
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: isCommunauteActive ? 600 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  Recettes Communauté
                </Typography>
              )}
            </Stack>
            {expanded && (communauteOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />)}
          </Stack>
        </Box>

        {/* Sous-menu communauté */}
        {expanded && (
          <Collapse in={communauteOpen} timeout="auto" unmountOnExit>
            <Stack spacing={0.5} sx={{ pl: 2 }}>
              {communauteItems.map((item, index) => (
                <ListItemButton
                  key={index}
                  component={Link}
                  to={item.path}
                  sx={getListItemStyle(item.path)}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </Stack>
          </Collapse>
        )}
      </Stack>

      <Box sx={{ padding: "16px 8px", marginTop: "auto" }}>
        <Tooltip title={expanded ? "Réduire" : "Agrandir"}>
          <IconButton 
            onClick={toggleExpand}
            sx={{ 
              marginLeft: expanded ? "auto" : "auto",
              marginRight: expanded ? "auto" : "auto",
              display: "flex",
              backgroundColor: theme.palette.background.default,
              '&:hover': {
                backgroundColor: theme.palette.primary.main + '10',
              }
            }}
          >
            {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

function getListItemStyle(path: string) {
  const location = useLocation();
  const theme = useMuiTheme();
  
  return {
    borderRadius: "8px",
    padding: "8px 10px",
    transition: "all 0.2s ease",
    backgroundColor: location.pathname === path ? theme.palette.primary.main + '20' : 'transparent',
    color: location.pathname === path ? theme.palette.primary.main : theme.palette.text.primary,
    '&:hover': {
      backgroundColor: location.pathname === path ? theme.palette.primary.main + '30' : theme.palette.primary.main + '10',
      transform: "translateX(5px)",
    },
  };
}