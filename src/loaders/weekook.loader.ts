import { redirect } from "react-router-dom"
import { AuthStore } from "../store/UserStore";

export async function weekookLoader() {
  const users = AuthStore.getValue()
  if (!users.user?.isConnected) {
    return redirect('/');
  }
  return null
}