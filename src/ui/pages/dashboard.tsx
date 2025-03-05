import { Box, Button } from "@mui/material";
import { AuthStore } from "../../store/UserStore";

export function Dashboard() {

  const handleStoreDisplay = () => {
    console.log(AuthStore.value.user?.isConnected)
  }

  return (
    <Box>
      Salut
      <Button onClick={handleStoreDisplay} variant="contained" color="secondary" >
        Affiche le status du store
      </Button>
    </Box>
  )
}