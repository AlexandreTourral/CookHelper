import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Stack, Typography } from "@mui/material"
import { theme } from "../theme";
import { MealCard } from "./MealCard";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addCollection, CollectionStore, removeCollection } from "../../store";
import { useObservable } from "@ngneat/react-rxjs";
import { useEffect, useState } from "react";

type CollectionCardProps = {
  collectionKey: string,
  collectionsList: Record<string, string[]>
}

export function CollectionCard({ collectionKey, collectionsList }: CollectionCardProps) {
  const collectionStore = useObservable(CollectionStore, (state) => state);
  const [checked, setChecked] = useState(false)

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
            { collectionsList[collectionKey].map((meals) => <MealCard meal={meals} key={meals} /> )}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  )
}