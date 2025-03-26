import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { PlanningApi } from "../../firebase";
import { DayMealType } from "../../type/menuType";
import { useObservable } from "@ngneat/react-rxjs";
import { PlanningStore } from "../../store";
import { PlanningMealCard } from "../atom";

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
  const [planningMeal, setPlanningMeal] = useState<Record<string, DayMealType>>({})
  const planningStore = useObservable(PlanningStore)[0]

  useEffect(() => {
    const fetchData = async () => {
      const { planning } = await PlanningApi.getWeekPlan()
      setPlanningMeal(planning)
    }

    fetchData()
  }, [planningStore.reloader])

  const rows = useMemo(() => {
    if (!planningMeal["lundi"]) return [];
    return [...PlanningApi.weekDays.map((day) => createData(day, planningMeal[day].lunch, planningMeal[day].diner))];
  }, [planningMeal]);

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
        {rows !== null
          ? <TableBody>
              {rows.map((row) => (
                <PlanningMealCard key={row.name} dayMeal={row} />
              ))}
            </TableBody>
          : null        
        }
      </Table>
    </TableContainer>
  )
}