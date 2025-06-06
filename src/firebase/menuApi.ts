import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getWeekookSubCollections } from "./collectionApi";
import { AuthStore } from "../store";

export class MenuApi {
  static async getMenu() {
    const subDocs = await getWeekookSubCollections();
    if (subDocs !== undefined) {
      return subDocs.Menu;
    }
    else {
      return []
    }
  }

  static async addMenu(name: string) {
    try {
      const menuRef = doc(db, "weekook", AuthStore.getValue().User?.uid ?? "Alexandre#1");
      const docSnap = await getDoc(menuRef)

      if (!docSnap.exists()) {
        await setDoc(menuRef, { Menu: [name] });
      }

      await updateDoc(menuRef, {
        Menu: arrayUnion(name),
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  }

  static async removeMenu(names: string[]) {
    try {
      await updateDoc(doc(db, "weekook", AuthStore.getValue().User?.uid ?? "Alexandre#1"), {
        Menu: arrayRemove(...names),
      });
    } catch (error) {
      console.log(error)
    } 
  }
}