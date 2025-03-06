import { Box, Grid2, Stack, Typography } from "@mui/material";
import { theme } from "../theme";

export function Dashboard() {
  return (
    <Box sx={{ width: "100%", backgroundColor: theme.palette.text.primary, borderRadius: "16px", textAlign: "center" }} >
      <Stack>
        <Grid2 container spacing={0} sx={{ '--Grid-borderWidth': '1px',
            borderTop: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderTopRightRadius: "16px",
            borderTopLeftRadius: "16px",
            borderBottomRightRadius: "none",
            borderColor: 'black',
            overflow: "hidden",
            '& > div': {
              borderRight: 'var(--Grid-borderWidth) solid',
              borderColor: "black",
            },
            '&:last-child': {
              borderTopRightRadius: "16px"
            }
          }}
        >
          <Grid2 size={1.5} sx={{ padding: "16px", justifyContent: "center", textAlign: "-webkit-center" }}>
            <img src="/assets/CookHelper_logo.webp" alt="Logo" className="h-36" />
          </Grid2>
          <Grid2 size="grow" sx={{ alignContent: "center" }}>
            <Typography variant="h6" color="secondary" >
              Lundi
            </Typography>
          </Grid2>
          <Grid2 size="grow" sx={{ alignContent: "center" }}>
            <Typography variant="h6" color="secondary">
              Mardi
            </Typography>
          </Grid2>
          <Grid2 size="grow" sx={{ alignContent: "center" }}>
            <Typography variant="h6" color="secondary">
              Mercredi
            </Typography>
          </Grid2>
          <Grid2 size="grow" sx={{ alignContent: "center" }}>
            <Typography variant="h6" color="secondary">
              Jeudi
            </Typography>
          </Grid2>
          <Grid2 size="grow" sx={{ alignContent: "center" }}>
            <Typography variant="h6" color="secondary">
              Vendredi
            </Typography>
          </Grid2>
          <Grid2 size="grow" sx={{ alignContent: "center" }}>
            <Typography variant="h6" color="secondary">
              Samedi
            </Typography>
          </Grid2>
          <Grid2 size="grow" sx={{ alignContent: "center" }}>
            <Typography variant="h6" color="secondary">
              Dimanche
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 container
          sx={{
            backgroundColor: theme.palette.secondary.main, 
            '--Grid-borderWidth': '1px',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderColor: 'black',
            overflow: "hidden",
            '& > div': {
              borderRight: 'var(--Grid-borderWidth) solid',
              borderColor: "black",
            },
            '& > div:first-child': {
              backgroundColor: theme.palette.text.primary,
            }
          }}
        >
          <Grid2 size={1.5} minHeight={250} sx={{ alignContent: "center" }}>
            <Typography variant="h6" color="secondary">
              Déjeuner
            </Typography>
          </Grid2>
          <Grid2 size="grow" >
            <Typography>
              Pas de repas prévu
            </Typography>
          </Grid2>
          <Grid2 size="grow" >
            <Typography>
              Pas de repas prévu
            </Typography>
          </Grid2>
          <Grid2 size="grow" >
            <Typography>
              Pas de repas prévu
            </Typography>
          </Grid2>
          <Grid2 size="grow" >
            <Typography>
              Pas de repas prévu
            </Typography>
          </Grid2>
          <Grid2 size="grow" >
            <Typography>
              Pas de repas prévu
            </Typography>
          </Grid2>
          <Grid2 size="grow" >
            <Typography>
              Pas de repas prévu
            </Typography>
          </Grid2>
          <Grid2 size="grow" >
            <Typography>
              Pas de repas prévu
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 container
          sx={{
            backgroundColor: theme.palette.primary.main, 
            '--Grid-borderWidth': '1px',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderColor: 'black',
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
            overflow: "hidden",
            '& > div': {
              borderRight: 'var(--Grid-borderWidth) solid',
              borderColor: "black",
            },
            '& > div:first-child': {
              backgroundColor: theme.palette.text.primary,
            }
          }}
        >
          <Grid2 size={1.5} minHeight={250} sx={{ alignContent: "center" }}>
            <Typography variant="h6" color="secondary">
              Diner
            </Typography>
          </Grid2>
          <Grid2 size="grow" >
            <Typography>
              Pas de repas prévu
            </Typography>
          </Grid2>
          <Grid2 size="grow" >
            <Typography>
              Pas de repas prévu
            </Typography>
          </Grid2>
          <Grid2 size="grow" >
            <Typography>
              Pas de repas prévu
            </Typography>
          </Grid2>
          <Grid2 size="grow" >
            <Typography>
              Pas de repas prévu
            </Typography>
          </Grid2>
          <Grid2 size="grow" >
            <Typography>
              Pas de repas prévu
            </Typography>
          </Grid2>
          <Grid2 size="grow" >
            <Typography>
              Pas de repas prévu
            </Typography>
          </Grid2>
          <Grid2 size="grow" >
            <Typography>
              Pas de repas prévu
            </Typography>
          </Grid2>
        </Grid2>
      </Stack>
    </Box>
  )
}