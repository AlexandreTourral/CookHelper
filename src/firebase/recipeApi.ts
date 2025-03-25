import { arrayRemove, arrayUnion, deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getWeekookSubCollections } from "./collectionApi";
import { ingredient } from "../type/recipeType";
import { AuthStore } from "../store";

export class RecipeApi {
  static async getRecipe() {
    const subDocs = await getWeekookSubCollections();
    if (subDocs === undefined || subDocs.Recipe === undefined) {
    return { recipe: {}, key: []};
    }
    return { recipe: subDocs.Recipe.meals as Record<string, ingredient[]>, key: subDocs.Recipe.key};
  }

  static async addRecipe(ingredient: ingredient[], mealName: string) {
    const { recipe } = await this.getRecipe()

    try {
      const recipeRef = doc(db, "weekook", AuthStore.getValue().User?.uid ?? "",);
      const docSnap = await getDoc(recipeRef)

      if (!docSnap.exists()) {
        await setDoc(recipeRef, {
          recipe: {
            meals: { [mealName]: ingredient, ...recipe },
            key: arrayUnion(mealName)
          }
        })
      } else {
          await updateDoc(recipeRef, {
            "Recipe.key": arrayUnion(mealName),
          });
          await updateDoc(recipeRef, {
            [`Recipe.meals.${mealName}`]: ingredient,
          });
        }
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  }

  static async removeRecipe(name: string) {
    try {
      const recipeRef = doc(db, "weekook", AuthStore.getValue().User?.uid ?? "",);
      await updateDoc(recipeRef, {
          "Recipe.key": arrayRemove(name),
      });
      await updateDoc(recipeRef, {
        [`Recipe.meals.${name}`]: deleteField(),
      });
    } catch (error) {
      console.log(error)
    } 
  }
}