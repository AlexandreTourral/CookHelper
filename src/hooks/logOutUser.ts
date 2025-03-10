import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { updateAuthStore } from "../store/UserStore";

export async function logOutUser() {
  try {
    await signOut(auth);
    updateAuthStore(false)
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
}
