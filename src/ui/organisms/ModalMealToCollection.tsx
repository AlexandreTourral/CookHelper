import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import { MenuApi } from "../../firebase";
import { MenuListForCollection } from "../molecules";

type modalMealToCollectionProps = {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  meals?: string[]
  title?: string
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: theme.palette.background.paper,
  boxShadow: 24,
  p: 4,
};

export function ModalMealToCollection({ open, onClose, onSubmit, meals, title = "🥞 Ajouter un plât à la Collection 📋" }: modalMealToCollectionProps) {
  const [mealList, setMealList] = useState<string[]>([])
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await MenuApi.getMenu()
      setMealList(response)
    }

    fetchData()
  }, [])


  return (
    <Modal
      open={open}
      onClose={onClose} 
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit} >
          <Stack spacing={4} sx={{ alignItems: "center" }}>
            <Typography variant="h5" >
              {title}
            </Typography>
            <MenuListForCollection meals={meals ? meals : mealList} />
            <Button type="submit" variant="contained" color="secondary">
              Envoyer
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}