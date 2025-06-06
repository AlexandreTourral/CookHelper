import { doc, updateDoc,  } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { DayMealType } from "../type/menuType";
import { getWeekookSubCollections } from "./collectionApi";
import { AuthStore } from "../store";

export class PlanningApi {
  static weekDays = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi" ,"dimanche"];    

  static async getWeekPlan() {
    const subDocs = await getWeekookSubCollections()

    if (subDocs === undefined) {
      return { lunch: [], diner: [], planning: {}}
    }
    const lunch = this.weekDays.map((day: string) => subDocs.Planning[day].lunch)
    const diner = this.weekDays.map((day: string) => subDocs.Planning[day].diner)
    return {lunch, diner, planning: subDocs.Planning}
  }

  static async addMealToDay(day: string, meal: DayMealType) {
    try {
      const planningRef = doc(db, "weekook", AuthStore.getValue().User?.uid ?? "");
      await updateDoc(planningRef, {
        [`Planning.${day}`]: meal 
      });
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
      const subDocs = await getWeekookSubCollections();
      const weekPlan = subDocs.Planning
      const planningRef = doc(db, "weekook", AuthStore.getValue().User?.uid ?? "",);

      if (state === "lunch") {
        const diner = weekPlan[day].diner
        await updateDoc(planningRef, { 
          [`Planning.${day}`]: { lunch: meal, diner} 
        });
      } else if (state === "diner") {
        const lunch = weekPlan[day].lunch
        await updateDoc(planningRef, {  [`Planning.${day}`]: { lunch, diner: meal} });
      } else {
        await updateDoc(planningRef, { [`Planning.${day}`]: { lunch: "Pas de repas prévu" , diner: "Pas de repas prévu"} });
      }
    } catch (error) {
      console.error(error);
    }
  }

  static async updateMealToDayV2(day: string, meal: string, state: string) {
    try {
      const subDocs = await getWeekookSubCollections();
      const weekPlan = subDocs.Planning
      const planningRef = doc(db, "weekook", AuthStore.getValue().User?.uid ?? "",);

      if (state === "lunch") {
        const diner = weekPlan[day].diner
        await updateDoc(planningRef, { 
          [`Planning.${day}`]: { lunch: meal, diner} 
        });
      } else if (state === "diner") {
        const lunch = weekPlan[day].lunch
        await updateDoc(planningRef, {  [`Planning.${day}`]: { lunch, diner: meal} });
      } else {
        await updateDoc(planningRef, { [`Planning.${day}`]: { lunch: "Pas de repas prévu" , diner: "Pas de repas prévu"} });
      }
    } catch (error) {
      console.error(error);
    }
  }
  
}


