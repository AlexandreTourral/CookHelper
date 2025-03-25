import { DayMealType } from "./menuType"
import { recipeType } from "./recipeType"

export type docType = {
  Menu: string[],
  Collections: Record<string, string[]>,
  Recipe: recipeType,
  Planning: Record<string, DayMealType>,
}