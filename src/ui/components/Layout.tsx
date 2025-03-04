import { Outlet } from "react-router-dom";
import { NavBar } from "../organisms";

export function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}