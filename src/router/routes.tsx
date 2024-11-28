import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../ui/components";
import { HomePage } from "../ui/pages";

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
    ],
  },
])

