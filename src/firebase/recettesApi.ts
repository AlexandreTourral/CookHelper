import { arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { recipeType } from "../type/mealType";

export class RecipeApi {
  static async getRecipes() {
    const querySnapshot = await getDocs(collection(db, "Recettes"));
    const recipes = querySnapshot.docs.map(doc => ({ ...doc.data() }));
    return recipes as recipeType[];
  }

  static async addRecipes(name: string) {
    try {
      const recetteRef = doc(db, "Recettes", "meal");
      await updateDoc(recetteRef, {
        meal: arrayUnion(name),
      });
      console.log("Recette ajoutée !");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  }

  static async removeRecipes(names: string[]) {
    try {
      await updateDoc(doc(db, "Recettes", "meal"), {
        meal: arrayRemove(...names),
      });
    } catch (error) {
      console.log(error)
    } 
  }
}