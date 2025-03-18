import { arrayRemove, arrayUnion, collection, deleteField, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { DayMealType } from "../type/menuType";

export class PlanningApi {
  static weekDays = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi" ,"dimanche"];

  static async getWeekPlan() {
    const querySnapshot = await getDocs(collection(db, "Planning"));
    const weekPlan = querySnapshot.docs.map(doc => ({ ...doc.data() as Record<string, DayMealType> }));
    const lunch = this.weekDays.map((day: string) => weekPlan[0][day].lunch)
    const diner = this.weekDays.map((day: string) => weekPlan[0][day].diner)
    return {lunch, diner}
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

  static async updateMealToDay(dayindex: number, meal: string, state: string) {
    try {
      const day = this.weekDays[dayindex];
      const querySnapshot = await getDocs(collection(db, "Planning"));
      const weekPlan = querySnapshot.docs.map(doc => ({ ...doc.data() as Record<string, DayMealType> }))[0];
      const planningRef = doc(db, "Planning", "Menu");

      if (state === "lunch") {
        const diner = weekPlan[day].diner
        await updateDoc(planningRef, { [day]: { lunch: meal, diner} });
      } else if (state === "diner") {
        const lunch = weekPlan[day].lunch
        await updateDoc(planningRef, { [day]: { lunch, diner: meal} });
      } else {
        await updateDoc(planningRef, { [day]: { lunch: "Pas de repas prévu" , diner: "Pas de repas prévu"} });
      }
      console.log("repas modifié avec succés")
    } catch (error) {
      console.error(error);
    }
  }
  
}


