import { arrayRemove, arrayUnion, collection, deleteField, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { AuthStore } from "../store";
import { docType } from "../type/docType";

export async function getWeekookSubCollections(): Promise<docType> {
  return new Promise((resolve) => {
    const user = AuthStore.getValue().User;
    const unsubscribe = onSnapshot(collection(db, "weekook"), (querySnapshot) => {
      const result = querySnapshot.docs.find((document) => document.id === user?.uid);
      resolve(result?.data() as docType);
      unsubscribe();
    });
  });
}

export class CollectionApi {
  static async getCollections() {
    const subDocs = await getWeekookSubCollections();
    if (subDocs) {
      return subDocs.Collections
    } else {
      return { key: [], "": [] }
    }
  }

  static async addCollection(name: string) {
    try {
      const collectionRef = doc(db, "weekook", AuthStore.getValue().User?.uid ?? "");
      const docSnap = await getDoc(collectionRef)

      if (!docSnap.exists())  {
        await setDoc(collectionRef, { Collections: {[name]: [], key: arrayUnion(name) }});
      } else {
        if (docSnap.get("Collections")) {
          const oldCollection = await this.getCollections()
          oldCollection["key"] = [...oldCollection["key"], name]
          oldCollection[name] = []
          await updateDoc(collectionRef, { Collections: oldCollection });
        } else {
          await updateDoc(collectionRef, { Collections: { key: [name], [name]: [] }});
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la collection :", error);
    }
  }

  static async addMealToCollection(meals: string[], collection: string) {
    const collectionRef = doc(db,  "weekook", AuthStore.getValue().User?.uid ?? "");
    const docSnap = await getDoc(collectionRef)
    const collectionTmp = docSnap.get("Collections")
    collectionTmp[collection] = [...collectionTmp[collection], ...meals]
    await updateDoc(collectionRef, {
      Collections: collectionTmp
    })
  }

  static async removeMealFromCollection(meals: string[], collection: string) {
    const collectionRef = doc(db, "weekook", AuthStore.getValue().User?.uid ?? "");
    const docSnap = await getDoc(collectionRef)
    const collectionTmp = docSnap.get("Collections")

    collectionTmp[collection] = [...collectionTmp[collection]].filter((meal) => !meals.includes(meal))
    await updateDoc(collectionRef, {
      Collections: collectionTmp
    })
  }

  static async removeCollections(names: string[]) {
    try {
      await Promise.all(
        names.map(async (name) => {
          const docRef = doc(db, "weekook", AuthStore.getValue().User?.uid ?? "");
          await updateDoc(docRef, {
            [`Collections.${name}`]: deleteField(),
            [`Collections.key`]: arrayRemove(name)
          })
        })
      );
    } catch (error) {
        console.error("Erreur lors de la suppression de la collection :", error);
    }
  }

}


