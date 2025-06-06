import { Button, Stack } from "@mui/material";
import { ModalNewMeal } from "../organisms";
import { MenuApi } from "../../firebase/menuApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MenuStore, resetMenu, updateMenuStatus } from "../../store";
import { useObservable } from "@ngneat/react-rxjs";

import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

export function MenuButton() {
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();
  const menuStore = useObservable(MenuStore)

  const handleSubmitForm = async (name: string) => {
    setModalState(false);
    await MenuApi.addMenu(name)
    navigate(".", { replace: true });
  }

  const handleRemoveMeal = () => {
    MenuApi.removeMenu(menuStore[0].deleteItem)
    resetMenu()
    navigate(".", { replace: true });
  }

  return (
    <Stack 
      direction={{ xs: "column", sm: "row" }} 
      spacing={2} 
      sx={{ 
        width: "100%", 
        alignItems: "center", 
        justifyContent: { xs: "center", sm: "start" }, 
        flexWrap: "wrap", 
      }}
    >
      {menuStore[0].isDeleting && (
        <Button variant="contained" color="primary" onClick={handleRemoveMeal} sx={{ width: { xs: "100%", sm: "fit-content" }, gap: "8px" }}>
          <DeleteIcon />
        </Button>
      )}

      <Button variant="contained" color="primary" onClick={() => navigate("/weekook/collection")} sx={{ width: { xs: "100%", sm: "fit-content" }, gap: "8px" }}>
        Collection
        <LibraryBooksIcon />
      </Button>
    
      <Button variant="contained" color="primary" onClick={() => setModalState(true)} sx={{ width: { xs: "100%", sm: "fit-content" }, gap: "8px" }}>
        Ajouter un plat
        <AddBoxIcon />
      </Button>
    
      {menuStore[0].isDeleting ? (
        <Button variant="contained" color="secondary" onClick={resetMenu} sx={{ width: { xs: "100%", sm: "fit-content" }, gap: "8px" }}>
          Annuler
          <DoNotDisturbIcon />
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={updateMenuStatus} sx={{ width: { xs: "100%", sm: "fit-content" }, gap: "8px" }}>
          Supprimer un plat
          <RemoveCircleOutlineIcon />
        </Button>
      )}

      <ModalNewMeal onClose={() => setModalState(false)} open={modalState} onSubmit={(name: string) => handleSubmitForm(name)} />
    </Stack>
  )
}