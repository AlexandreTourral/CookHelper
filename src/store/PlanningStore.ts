import { createStore, withProps } from '@ngneat/elf';
import { DayMealType } from '../type/menuType';

export interface PlanningProps {
  deleteItem: Record<string, DayMealType>;
  addMeal: string;
  isDeleting: boolean;
  meals: string[];
  reloader: boolean;
}

export const PlanningStore = createStore(
  { name: 'collection' },
  withProps<PlanningProps>({ deleteItem: {}, addMeal: "",isDeleting: false, meals: [], reloader: false })
);

export function updatePlanningStatus() {
  PlanningStore.update((state) => ({
    ...state,
    isDeleting: !PlanningStore.value.isDeleting
  }))
}

export function addRemoveMealFromPlanning(day: string, meals: DayMealType) {
  let tmpData = PlanningStore.value.deleteItem
  tmpData[day] = meals

  PlanningStore.update((state) => ({
    ...state,
    deleteItem: tmpData
  }))
}

export function reloadPlanning() {
  PlanningStore.update((state) => ({
    ...state,
    reloader: !state.reloader
  }))
}

export function addMealToPlanning(meal: string) {
  PlanningStore.update((state) => ({
    ...state,
    addMeal: meal,
  }))
}

export function removeMealFromPlanning() {
  PlanningStore.update((state) => ({
    ...state,
    addMeal: "",
  }))
}