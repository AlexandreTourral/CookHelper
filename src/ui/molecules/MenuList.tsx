import { Box, Stack } from "@mui/material";
import { theme } from "../theme";
import { MealCard } from "../atom";

type menuListProps = {
  meals: string[]
}

export function MenuList({ meals }: menuListProps) {
  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: "8px", border: "solid 1px", borderColor: theme.palette.secondary.main, padding: "8px 16px 8px 16px" }}>
      <Stack direction="column"
        sx={{
          '& > *:not(:first-child)': {
            borderTop: '1px solid black',
            borderColor: theme.palette.secondary.main,
          },
        }}
      >
        { meals.map((meal) => <MealCard meal={meal} key={meal} /> )}
      </Stack>
    </Box>
  )
}