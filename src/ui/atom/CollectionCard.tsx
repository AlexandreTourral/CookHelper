import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Stack, Typography } from "@mui/material"
import { theme } from "../theme";
import { MealCard } from "./MealCard";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addCollection, CollectionStore, removeCollection, resetCollection } from "../../store";
import { useObservable } from "@ngneat/react-rxjs";
import { useEffect, useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ModalMealToCollection } from "../organisms";
import { CollectionApi } from "../../firebase";
import { useNavigate } from "react-router-dom";

type CollectionCardProps = {
  collectionKey: string,
  collectionsList: Record<string, string[]>
}

export function CollectionCard({ collectionKey, collectionsList }: CollectionCardProps) {
  const collectionStore = useObservable(CollectionStore, (state) => state);
  const [checked, setChecked] = useState(false)
  const [isModalMealToCollectionOpen, setModalMealToCollectionState] = useState(false)
  const [isModalRemoveMealFromCollectionOpen, setModalRemoveMealFromCollectionState] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (collectionStore[0].deleteItem.indexOf(collectionKey) === -1) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }, [collectionStore[0].isDeleting])

  const handleCheckboxChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    if (checked) {
      removeCollection(collectionKey)
    } else {
      addCollection(collectionKey)
    }
  }

  const handleAddMealToCollection = () => {
    setModalMealToCollectionState(true)
  }

  const handleRemoveMealToCollection = () => {
    setModalRemoveMealFromCollectionState(true)
  }

  const handleSubmitedModal = async () => {
    const meals = CollectionStore.value.meals;
    setModalMealToCollectionState(false);
    await CollectionApi.addMealToCollection(meals, collectionKey);
    resetCollection();
    navigate(".", { replace: true });
  }

  const handleSubmitedRemoveModal = async () => {
    const meals = CollectionStore.value.meals;
    setModalRemoveMealFromCollectionState(false);
    await CollectionApi.removeMealFromCollection(meals, collectionKey);
    resetCollection();
    navigate(".", { replace: true });
  }

  return (
    <Stack direction="row" spacing={1}>
      { collectionStore[0].isDeleting ? <Checkbox onChange={handleCheckboxChecked} checked={checked} color="secondary" /> : null }
      <Accordion sx={{ boxShadow: "none", width: "100%" }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          >
          <Typography variant="h6"> { collectionKey.toUpperCase() } </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column"
            sx={{
              '& > *:not(:first-child)': {
                borderTop: '1px solid black',
                borderColor: theme.palette.secondary.main,
              },
            }}
            >
            <Stack direction="row" spacing={2} sx={{ marginBottom: "16px" }}>
              <Button variant="contained" color="primary" onClick={handleAddMealToCollection} sx={{ width: "fit-content", gap: "8px" }}>
                Ajouter un plat à la collection
                <AddBoxIcon />
              </Button>
              <Button variant="contained" color="primary" onClick={handleRemoveMealToCollection} sx={{ width: "fit-content", gap: "8px" }}>
                Supprimer un plat de la collection
                <AddBoxIcon />
              </Button>
            </Stack>
            { collectionsList[collectionKey].map((meals) => <MealCard meal={meals} key={meals} /> )}
          </Stack>
        </AccordionDetails>
      </Accordion>
      <ModalMealToCollection onClose={() => setModalMealToCollectionState(false)} onSubmit={handleSubmitedModal} open={isModalMealToCollectionOpen} />
      <ModalMealToCollection title="🥞 Supprimer un plât de la Collection 📋" meals={collectionsList[collectionKey]} onClose={() => setModalRemoveMealFromCollectionState(false)} onSubmit={handleSubmitedRemoveModal} open={isModalRemoveMealFromCollectionOpen} />
    </Stack>
  )
}