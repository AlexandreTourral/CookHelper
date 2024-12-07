import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../ui/components";
import { Dashboard, HomePage, LogInPage, SignUpPage } from "../ui/pages";
import { dashboardLoader } from "../loaders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
        loader: async () => {
        },
      },
      {
        path: "SignUp",
        element: <SignUpPage />,
        loader: async () => {
        },
      },
      {
        path: "LogIn",
        element: <LogInPage />,
        loader: async () => {
        },
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
      },
    ],
  },
])

