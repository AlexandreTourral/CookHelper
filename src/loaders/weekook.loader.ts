import { redirect } from "react-router-dom"
import { AuthStore } from "../store/UserStore";

export async function weekookLoader() {
  const user = AuthStore.getValue()
  if (!user.user?.isConnected) {
    return redirect('/');
  }
  return null
}