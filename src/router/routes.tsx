import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../ui/components";
import { Dashboard, HomePage, LogInPage, Menu, SignUpPage, Weekook } from "../ui/pages";
import { menuLoader, weekookLoader } from "../loaders";

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
        path: "weekook",
        element: <Weekook />,
        loader: weekookLoader,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "menu",
            loader: menuLoader,
            element: <Menu />,
          },
          {
            path: "planning",
            element: <Dashboard />,
          },
        ]
      },
    ],
  },
])

