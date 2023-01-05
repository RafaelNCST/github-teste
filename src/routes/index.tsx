import { createBrowserRouter } from "react-router-dom";
import { HomePage, Perfil } from "../screens";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
]);
