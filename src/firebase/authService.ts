import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseConfig";
import { updateAuthStore } from "../store";

const auth = getAuth(app);

export async function initAuthState() {
  const isConnected = await isUserConnected();
  updateAuthStore(isConnected);
}

export function isUserConnected(): Promise<boolean> {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(!!user);
    });
  });
}

export function listenAuthChanges(callback: (user: any) => void) {
  onAuthStateChanged(auth, callback);
}

export { auth };
