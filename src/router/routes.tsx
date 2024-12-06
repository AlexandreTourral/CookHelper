import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../ui/components";
import { HomePage, SignUpPage } from "../ui/pages";

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
    ],
  },
])

