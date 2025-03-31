import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { PlanningApi } from "../../firebase";
import { DayMealType } from "../../type/menuType";
import { useObservable } from "@ngneat/react-rxjs";
import { PlanningStore, reloadPlanning } from "../../store";
import { PlanningMealCard } from "../atom";
import { EmptyState } from "../molecules";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import { selectMeals } from "../../API/geminiAI";
import { Box } from "@mui/material";
import { theme } from "../theme";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.text.primary
  },
}));

function createData(
  name: string,
  lunch: string,
  diner: string,
) {
  return { name, lunch, diner };
}

export function MealPlanArray() {
  const [planningMeal, setPlanningMeal] = useState<Record<string, DayMealType>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const planningStore = useObservable(PlanningStore)[0];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { planning } = await PlanningApi.getWeekPlan();
        setPlanningMeal(planning);
      } catch (error) {
        console.error("Erreur lors de la récupération du planning:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [planningStore.reloader]);

  const rows = useMemo(() => {
    if (!planningMeal["lundi"]) return [];
    return [...PlanningApi.weekDays.map((day) => createData(day, planningMeal[day].lunch, planningMeal[day].diner))];
  }, [planningMeal]);

  const handleGenerateMenus = async () => {
    try {
      setIsGenerating(true);
      const weekMeals = await selectMeals();
      await PlanningApi.addWeekMeals(weekMeals);
      reloadPlanning();
    } catch (error) {
      console.error("Erreur lors de la génération des menus:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const isPlanningEmpty = !isLoading && (!planningMeal["lundi"] || rows.length === 0);

  if (isPlanningEmpty) {
    return (
      <EmptyState 
        title="Aucun planning de repas" 
        description="Pour créer votre planning, vous devez d'abord avoir des plats dans votre menu, puis générer automatiquement votre planning hebdomadaire."
        icon={<CalendarMonthIcon sx={{ fontSize: 80 }} />}
        actionButton={{
          label: isGenerating ? "Génération en cours..." : "Générer les menus",
          onClick: handleGenerateMenus
        }}
        sx={{
          mt: 2,
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 3,
          p: 2,
          bgcolor: theme.palette.info.light + '20',
          borderRadius: 2,
          border: `1px solid ${theme.palette.info.light}`,
          '& svg': {
            color: theme.palette.info.main
          }
        }}>
          <InfoIcon />
          <span>Assurez-vous d'avoir ajouté des plats dans votre menu pour pouvoir générer un planning.</span>
        </Box>
      </EmptyState>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> 
              <img src="/assets/CookHelper_logo.webp" alt="Logo" className="h-15" />
            </StyledTableCell>
            <StyledTableCell align="center"> Déjeuner </StyledTableCell>
            <StyledTableCell align="center"> Diner</StyledTableCell>
          </TableRow>
        </TableHead>
        {rows.length > 0 && (
          <TableBody>
            {rows.map((row) => (
              <PlanningMealCard key={row.name} dayMeal={row} />
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}