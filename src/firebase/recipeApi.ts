import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getWeekookSubCollections } from "./collectionApi";
import { ingredient, recipeType } from "../type/recipeType";

export class RecipeApi {
  static async getRecipe() {
    const subDocs = await getWeekookSubCollections();
    return { recipe: subDocs.Recettes.meals as Record<string, ingredient[]>, key: subDocs.Recettes.key};
  }

  static async addRecipe(ingredient: ingredient[], mealName: string) {
    const { recipe } = await this.getRecipe()
    try {
      const recipeRef = doc(db, "weekook", "Recettes");
      await updateDoc(recipeRef, {
        meals: { [mealName]: ingredient, ...recipe },
        key: arrayUnion(mealName)
      });
      console.log("Recette ajoutée !");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  }

  static async removeMenu(names: string[]) {
    try {
      await updateDoc(doc(db, "weekook", "Menu"), {
        meal: arrayRemove(...names),
        key: arrayRemove(...names)
      });
    } catch (error) {
      console.log(error)
    } 
  }
}