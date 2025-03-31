import { Box } from "@mui/material";
import { NavBar } from "../organisms/NavBar";
import { SideBar } from "../organisms/SideBar";
import { MobileDrawer } from "../organisms/MobileDrawer";
import { ReactNode, useState } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [expanded, setExpanded] = useState(false);

  // Fonction pour écouter l'état d'expansion de la sidebar
  const handleSidebarExpand = (isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <NavBar />
      <SideBar onExpandChange={handleSidebarExpand} />
      <MobileDrawer />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: { 
            xs: '100%', 
            md: `calc(100% - ${expanded ? '240px' : '70px'})` 
          },
          marginLeft: { 
            xs: 0,
            md: expanded ? '240px' : '70px'
          },
          marginTop: '64px', // Hauteur de la navbar
          transition: 'margin 0.3s ease, width 0.3s ease',
          overflow: 'auto', // Permet le défilement si nécessaire
        }}
      >
        <Box sx={{ padding: { xs: '16px', md: '32px' } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
} 