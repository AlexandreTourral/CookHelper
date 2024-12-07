import { isTokenValid } from "../hooks"
import { redirect } from "react-router-dom"

export async function dashboardLoader() {
  if (!isTokenValid(localStorage.getItem('jwt'))) {
    return redirect('/');
  }
  return null
}