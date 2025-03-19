import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getWeekookSubCollections } from "./collectionApi";

export class MenuApi {
  static async getMenu() {
    const subDocs = await getWeekookSubCollections();
    return subDocs.Menu.meals as string[];
  }

  static async addMenu(name: string) {
    try {
      const menuRef = doc(db, "weekook", "Menu");
      await updateDoc(menuRef, {
        meals: arrayUnion(name),
      });
      console.log("Menu ajoutée !");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  }

  static async removeMenu(names: string[]) {
    try {
      await updateDoc(doc(db, "weekook", "Menu"), {
        meal: arrayRemove(...names),
      });
    } catch (error) {
      console.log(error)
    } 
  }
}