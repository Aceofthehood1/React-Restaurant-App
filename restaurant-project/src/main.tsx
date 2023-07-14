import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  //imported this to be able to create a routing system
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CustomerRegistrationPage from "./pages/CustomerRegistrationPage";

const router = createBrowserRouter([
  // Part of routing code
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "customerRegister",
    element: <CustomerRegistrationPage></CustomerRegistrationPage>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/*Part of routing code*/}
  </React.StrictMode>
);
