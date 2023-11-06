import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  //imported this to be able to create a routing system
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RestaurantSignUpPage from "./pages/RestaurantSignUpPage"; //Import pages before you can use them
import RestaurantSignInPage from "./pages/RestaurantSignInPage";
import CustomerSignUpPage from "./pages/CustomerSignUpPage";
import CustomerSignInPage from "./pages/CustomerSignInPage";
import CustomerHomePage from "./pages/CustomerHomePage";

const router = createBrowserRouter([
  // Part of routing code
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "restaurantSignUp",
    element: <RestaurantSignUpPage></RestaurantSignUpPage>,
  },
  {
    path: "restaurantSignIn",
    element: <RestaurantSignInPage></RestaurantSignInPage>,
  },
  {
    path: "customerSignUp",
    element: <CustomerSignUpPage></CustomerSignUpPage>,
  },
  {
    path: "customerSignIn",
    element: <CustomerSignInPage></CustomerSignInPage>,
  },
  {
    path: "customerHomePage",
    element: <CustomerHomePage></CustomerHomePage>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} /> {/*Part of routing code*/}
  </React.StrictMode>
);

/* typescript fucntion template
function NavBar() {
  return (
    <>
    
    </>
  );
}

export default NavBar;
*/
