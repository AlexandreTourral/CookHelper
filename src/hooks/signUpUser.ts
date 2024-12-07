import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export async function signUpUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken()
    localStorage.setItem("jwt", token)
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error;
  }
}