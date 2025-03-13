import { arrayRemove, arrayUnion, collection, deleteField, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { DayMealType } from "../type/menuType";

export class PlanningApi {
  static weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ,"Dimanche"];

  static async getWeekPlan() {
    const querySnapshot = await getDocs(collection(db, "Planning", "Menu"));
    const collections = querySnapshot.docs.map(doc => ({ ...doc.data() }));
    return collections as Record<string, Record<string, string>>[];
  }

  static async addMealToDay(day: string, meal: DayMealType) {
    try {
      const planningRef = doc(db, "Planning", "Menu");
      await updateDoc(planningRef, { [day]: meal });
      console.log("repas ajoutés avec succés")
    } catch (error) {
      console.error(error);
    }
  }

  static async addWeekMeals(weekMeal: Record<string, DayMealType>) {
    try {
      this.weekDays.forEach((day) => this.addMealToDay(day, weekMeal[day]))      
    } catch (error) {
      console.error(error)
    }
  }

  static async addCollection(name: string) {
    try {
      const collectionRef = doc(db, "Collections", "collections");
      await updateDoc(collectionRef, { [name]: [] } );
      await updateDoc(collectionRef, { key: arrayUnion(name) } )
    } catch (error) {
      console.error("Erreur lors de l'ajout de la collection :", error);
    }
  }

  static async addMealToCollection(meals: string[], collection: string) {
    const collectionRef = doc(db, "Collections", "collections");
    await updateDoc(collectionRef, {
      [collection]: arrayUnion(...meals)
    })
  }

  static async removeMealFromCollection(meals: string[], collection: string) {
    const collectionRef = doc(db, "Collections", "collections");
    await updateDoc(collectionRef, {
      [collection]: arrayRemove(...meals)
    })
  }

  static async removeCollections(names: string[]) {
    try {
      await Promise.all(
        names.map(async (name) => {
          const docRef = doc(db, "Collections", "collections");
          await updateDoc(docRef, {
            [name]: deleteField(),
            key: arrayRemove(name)
          })
        })
      );
    } catch (error) {
        console.error("Erreur lors de la suppression de la collection :", error);
    }
  }

}


