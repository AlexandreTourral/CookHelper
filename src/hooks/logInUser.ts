import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export async function LogInUser(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw new Error(error.message);
  }
}