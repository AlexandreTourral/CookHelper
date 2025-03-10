import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export async function signUpUser(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error;
  }
}