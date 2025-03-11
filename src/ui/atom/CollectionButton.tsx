import { Button, Stack } from "@mui/material";
import { ModalNewCollection } from "../organisms";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CollectionStore, resetCollection, resetMenu, updateCollectionStatus } from "../../store";
import { useObservable } from "@ngneat/react-rxjs";

import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { CollectionApi } from "../../firebase";

export function CollectionButton() {
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();
  const collectionStore = useObservable(CollectionStore, (state) => state.isDeleting)

  const handleSubmitForm = async (name: string) => {
    setModalState(false);
    await CollectionApi.addCollection(name);
    navigate(".", { replace: true });
  }

  const handleRemoveCollection = () => {
    CollectionApi.removeCollections(collectionStore[0].deleteItem)
    resetCollection();
    navigate(".", { replace: true });
  }

  return (
    <Stack direction={"row"} spacing={2} sx={{ alignSelf: "end" }}>
      { collectionStore[0].isDeleting
        ? <Button variant="contained" color="primary" onClick={handleRemoveCollection} sx={{ width: "fit-content", gap: "8px" }}>
            <DeleteIcon />
          </Button>
        : null  
      }
      <Button variant="contained" color="primary" onClick={() => setModalState(true)} sx={{ width: "fit-content", gap: "8px" }}>
        Ajouter une collection
        <AddBoxIcon />
      </Button>
      { collectionStore[0].isDeleting
        ? <Button variant="contained" color="secondary" onClick={resetCollection} sx={{ width: "fit-content", gap: "8px" }}>
            Annuler
          </Button>
        : <Button variant="contained" color="primary" onClick={updateCollectionStatus} sx={{ width: "fit-content", gap: "8px" }}>
            Supprimer une collection
            <RemoveCircleOutlineIcon />
          </Button>
      }
      <ModalNewCollection onClose={() => setModalState(false)} open={modalState} onSubmit={(name: string) => handleSubmitForm(name)} />
    </Stack>
  )
}