import { Grid2, Stack, Typography } from "@mui/material";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import { PlanningApi } from "../../firebase";
import { PlanningMealCard } from "../atom";
import { useObservable } from "@ngneat/react-rxjs";
import { PlanningStore } from "../../store";

export function MealPlanArray() {
  const planninStore = useObservable(PlanningStore)
  const [lunchMeal, setLunchMeal] = useState<string[]>([])
  const [dinerMeal, setDinerMeal] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const {lunch, diner} = await PlanningApi.getWeekPlan()
      setLunchMeal(lunch)
      setDinerMeal(diner)
    }

    fetchData()
  }, [planninStore[0].reloader])

  return (
    <Stack sx={{ marginTop: "16px" }}>
      <Grid2 container spacing={0} sx={{ '--Grid-borderWidth': '1px',
          backgroundColor: theme.palette.text.primary,
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
        { lunchMeal.map((lunch, index) => (
          <PlanningMealCard key={lunch + index} meal={lunch} type="lunch" day={index} />
        ))}
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
        { dinerMeal.map((diner, index) => (
          <PlanningMealCard key={diner + index} meal={diner} type="diner" day={index} />
        ))}
      </Grid2>
    </Stack>
  )
}