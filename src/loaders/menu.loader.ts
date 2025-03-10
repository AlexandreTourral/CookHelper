import { RecipeApi } from "../firebase/recettesApi"

export async function menuLoader() {
  const recipes = await RecipeApi.getRecipes();
  return recipes[0].meal
}