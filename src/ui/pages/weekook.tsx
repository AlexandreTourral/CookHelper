import { Grid2 } from "@mui/material";
import { SideBar } from "../organisms";
import { Outlet } from "react-router-dom";

export function Weekook() {
  return (
    <Grid2 container direction="row" spacing={5} sx={{ width: "100vw" }}>
      <SideBar />
      <Grid2 size="grow" sx={{ margin: "32px 32px 32px 0px" }}>
       <Outlet />
      </Grid2>
    </Grid2>
  )
}