import { Stack, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { MenuButton } from "../atom";
import { MenuList } from "../molecules";

export function Menu() {
  const meals = useLoaderData() as string[]

  return (
    <Stack spacing={3}>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        🍱 Vos Plats 🥗
      </Typography>
      <MenuButton />
      {meals !== undefined
        ? <MenuList meals={meals} />
        : null
      }
    </Stack> 
  )
}