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

  const handleSubmitForm = (name: string) => {
    setModalState(false);
    MenuApi.addMenu(name)
    navigate(".", { replace: true });
  }

  const handleRemoveMeal = () => {
    MenuApi.removeMenu(menuStore[0].deleteItem)
    resetMenu()
    navigate(".", { replace: true });
  }

  return (
    <Stack direction={"row"} spacing={2} sx={{ alignSelf: "end" }}>
      { menuStore[0].isDeleting
        ? <Button variant="contained" color="primary" onClick={handleRemoveMeal} sx={{ width: "fit-content", gap: "8px" }}>
            <DeleteIcon />
          </Button>
        : null  
      }
      <Button variant="contained" color="primary" onClick={() => navigate("/weekook/collection")} sx={{ width: "fit-content", gap: "8px" }}>
        Collection
        <LibraryBooksIcon />
      </Button>
      <Button variant="contained" color="primary" onClick={() => setModalState(true)} sx={{ width: "fit-content", gap: "8px" }}>
        Ajouter un plat
        <AddBoxIcon />
      </Button>
      { menuStore[0].isDeleting
        ? <Button variant="contained" color="secondary" onClick={resetMenu} sx={{ width: "fit-content", gap: "8px" }}>
            Annuler
            <DoNotDisturbIcon />
          </Button>
        : <Button variant="contained" color="primary" onClick={updateMenuStatus} sx={{ width: "fit-content", gap: "8px" }}>
            Supprimer un plat
            <RemoveCircleOutlineIcon />
          </Button>
      }
      <ModalNewMeal onClose={() => setModalState(false)} open={modalState} onSubmit={(name: string) => handleSubmitForm(name)} />
    </Stack>
  )
}