import { Box, Stack } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { MenuButton } from "../atom";
import { MenuList } from "../molecules";
import { theme } from "../theme";

export function Menu() {
  const meals = useLoaderData() as string[]

  return (
    <Stack spacing={2}>
      <Box sx={{ width: "100%", backgroundColor: theme.palette.background.paper, borderRadius: "8px", textAlign: "center", border: "solid 1px", borderColor: theme.palette.secondary.main, padding: "16px 16px 16px 16px" }}>
        <MenuButton />
      </Box>
      {meals !== undefined
        ? <MenuList meals={meals} />
        : null
      }
    </Stack> 
  )
}