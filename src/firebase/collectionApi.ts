import { arrayRemove, arrayUnion, collection, deleteField, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function getWeekookSubCollections() {
  const querySnapshot = await getDocs(collection(db, "weekook"));
  const subDocs = querySnapshot.docs.map(doc => ({...doc.data()}));

  const docs = {
    Collections: subDocs[0],
    Menu: subDocs[1],
    Planning: subDocs[2],
    Recettes: subDocs[3]
  }
  return docs
}

export class CollectionApi {
  static async getCollections() {
    const subDocs = await getWeekookSubCollections();
    return subDocs.Collections as Record<string, string[]>;
  }

  static async addCollection(name: string) {
    try {
      const collectionRef = doc(db, "weekook", "Collections");
      await updateDoc(collectionRef, { [name]: [] } );
      await updateDoc(collectionRef, { key: arrayUnion(name) } )
    } catch (error) {
      console.error("Erreur lors de l'ajout de la collection :", error);
    }
  }

  static async addMealToCollection(meals: string[], collection: string) {
    const collectionRef = doc(db, "weekook", "Collections");
    await updateDoc(collectionRef, {
      [collection]: arrayUnion(...meals)
    })
  }

  static async removeMealFromCollection(meals: string[], collection: string) {
    const collectionRef = doc(db, "weekook", "Collections");
    await updateDoc(collectionRef, {
      [collection]: arrayRemove(...meals)
    })
  }

  static async removeCollections(names: string[]) {
    try {
      await Promise.all(
        names.map(async (name) => {
          const docRef = doc(db, "weekook", "Collections");
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


