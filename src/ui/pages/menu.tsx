import { Stack, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { MenuButton } from "../atom";
import { MenuList } from "../molecules";

export function Menu() {
  const recipes = useLoaderData() as string[]

  return (
    <Stack spacing={3}>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        🍱 Vos recettes 🥗
      </Typography>
      <MenuButton />
      <MenuList recipes={recipes} />
    </Stack> 
  )
}