import { RecipeApi } from "../firebase/recipeApi";
import { ingredient } from "../type/recipeType";

export async function recipeLoader() {
  const {recipe, key } = await RecipeApi.getRecipe();
  return {recipe: recipe as Record<string, ingredient[]>, mealKey: key as string[] }
}