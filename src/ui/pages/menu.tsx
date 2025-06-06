import { Box, Stack } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MenuButton } from "../atom";
import { EmptyState, MenuList } from "../molecules";
import { theme } from "../theme";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { useState } from "react";
import { ModalNewMeal } from "../organisms";
import { MenuApi } from "../../firebase/menuApi";

export function Menu() {
  const meals = useLoaderData() as string[]
  const hasMeals = Array.isArray(meals) && meals.length > 0;
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForm = async (name: string) => {
    setModalState(false);
    await MenuApi.addMenu(name);
    navigate(".", { replace: true });
  };

  const openAddMealModal = () => {
    setModalState(true);
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ width: "100%", backgroundColor: theme.palette.background.paper, borderRadius: "8px", textAlign: "center", border: "solid 1px", borderColor: theme.palette.secondary.main, padding: "16px 16px 16px 16px" }}>
        <MenuButton />
      </Box>
      
      {hasMeals ? (
        <MenuList meals={meals} />
      ) : (
        <EmptyState 
          title="Aucun menu disponible" 
          description="Vous n'avez pas encore créé de menu. Créez votre premier menu pour commencer à organiser vos repas!"
          icon={<RestaurantMenuIcon sx={{ fontSize: 80 }} />}
          actionButton={{
            label: "Ajouter un plat",
            onClick: openAddMealModal
          }}
        />
      )}
      
      <ModalNewMeal 
        open={modalState} 
        onClose={() => setModalState(false)} 
        onSubmit={handleSubmitForm} 
      />
    </Stack> 
  )
}