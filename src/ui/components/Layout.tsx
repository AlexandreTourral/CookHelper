import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <div>
        NavBar
      </div>
      <Outlet />
    </div>
  )
}