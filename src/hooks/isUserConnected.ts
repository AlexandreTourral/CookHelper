import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export function isUserConnected(): Promise<boolean> {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}