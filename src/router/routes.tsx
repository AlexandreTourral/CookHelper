import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../ui/components";
import { Collection, CommunauteDesserts, CommunauteEntrees, CommunautePlatsPrincipaux, Dashboard, HomePage, LogInPage, Menu, Planning, Recettes, SignUpPage, Weekook } from "../ui/pages";
import { collectionLoader, menuLoader, recipeLoader, weekookLoader } from "../loaders";

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
            element: <Planning />,
          },
          {
            path: "recettes",
            loader: recipeLoader,
            element: <Recettes />,
          },
          {
            path: "collection",
            element: <Collection />,
            loader: collectionLoader,
          },
          {
            path: "communaute/plats-principaux",
            element: <CommunautePlatsPrincipaux />,
          },
          {
            path: "communaute/entrees",
            element: <CommunauteEntrees />,
          },
          {
            path: "communaute/desserts",
            element: <CommunauteDesserts />,
          }
        ]
      },
    ],
  },
])

