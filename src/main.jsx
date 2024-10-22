import React from "react";
import { createRoot } from "react-dom/client";
import Dashboard from "./pages/dashboard";
import Maps from "./pages/maps";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/maps",
    element: <Maps />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
