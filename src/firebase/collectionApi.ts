import { arrayRemove, arrayUnion, collection, deleteField, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export class CollectionApi {
  static async getCollections() {
    const querySnapshot = await getDocs(collection(db, "Collections"));
    const collections = querySnapshot.docs.map(doc => ({ ...doc.data() }));
    return collections as Record<string, string[]>[];
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

  static async addMealToCollection(meal: string, collection: string) {
    const collectionRef = doc(db, "Collections", "collections");
    await updateDoc(collectionRef, {
      [collection]: arrayUnion(meal)
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


