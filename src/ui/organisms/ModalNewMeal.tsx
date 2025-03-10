import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { theme } from "../theme";
import { useState } from "react";

type modalNewMealProps = {
  open: boolean
  onClose: () => void
  onSubmit: (name: string) => void
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: theme.palette.background.paper,
  boxShadow: 24,
  p: 4,
};

export function ModalNewMeal({ open, onClose, onSubmit }: modalNewMealProps) {
  const [name, setName] = useState("")
  
  const handleSubmit = (name: string) => {
    setName("");
    onSubmit(name) ;
  }

  return (
    <Modal
      open={open}
      onClose={onClose} 
    >
      <Box sx={style}>
        <form onSubmit={() => handleSubmit(name)} >
          <Stack spacing={4} sx={{ alignItems: "center" }}>
            <Typography variant="h5" >
              🥞 Ajouter un plat 🌮
            </Typography>
            <TextField id="outlined-basic" label="Nom du plat" variant="outlined" color="secondary" value={name} onChange={(e) => setName(e.target.value)} />
            <Button type="submit" variant="contained" color="secondary">
              Envoyer
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}