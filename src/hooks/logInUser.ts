import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export async function LogInUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken()
    localStorage.setItem("jwt", token)
  } catch (error: any) {
    throw new Error(error.message);
  }
}