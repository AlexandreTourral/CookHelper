import { Box, Stack } from "@mui/material";
import { theme } from "../theme";
import { MealCardForPlanning } from "../atom";

type menuListProps = {
  meals: string[]
}

export function MenuListForPlanning({ meals }: menuListProps) {
  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: "16px", border: "solid 1px", borderColor: theme.palette.secondary.main, padding: "8px 16px 8px 16px" }}>
      <Stack direction="column"
        sx={{
          '& > *:not(:first-child)': {
            borderTop: '1px solid black',
            borderColor: theme.palette.secondary.main,
          },
        }}
      >
        { meals.map((meal) => <MealCardForPlanning meal={meal} key={meal} /> )}
      </Stack>
    </Box>
  )
}