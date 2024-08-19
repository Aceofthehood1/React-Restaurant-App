import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  //imported this to be able to create a routing system
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RestaurantSignUpPage from "./pages/restaurant-admin-pages/RestaurantSignUpPage"; //Import pages before you can use them
import RestaurantSignInPage from "./pages/restaurant-admin-pages/RestaurantSignInPage";
import CustomerSignUpPage from "./pages/customer-pages/CustomerSignUpPage";
import CustomerSignInPage from "./pages/customer-pages/CustomerSignInPage";
import CustomerHomePage from "./pages/customer-pages/CustomerHomePage";
import RestaurantPage from "./pages/customer-pages/RestaurantPage";
import RestaurantAdminPage from "./pages/restaurant-admin-pages/RestaurantAdminPage";
import AddNewDishPage from "./pages/restaurant-admin-pages/AddNewDishPage";
import AddNewCategoryPage from "./pages/restaurant-admin-pages/AddNewCategoryPage";
import AddNewPromotionPage from "./pages/restaurant-admin-pages/AddNewPromotionPage";
import DishListPage from "./pages/restaurant-admin-pages/DishListPage";
import EditDishPage from "./pages/restaurant-admin-pages/EditDishPage";
import CategoryListPage from "./pages/restaurant-admin-pages/CategoryListPage";
import PromotionListPage from "./pages/restaurant-admin-pages/PromotionListPage";
import EditCategoryPage from "./pages/restaurant-admin-pages/EditCategoryPage";
import EditPromotionPage from "./pages/restaurant-admin-pages/EditPromotionPage";
import RestaurantMenuPage from "./pages/customer-pages/RestaurantMenuPage";

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
  {
    path: "restaurantPage",
    element: <RestaurantPage></RestaurantPage>,
  },
  {
    path: "restaurantAdminPage",
    element: <RestaurantAdminPage></RestaurantAdminPage>,
  },
  {
    path: "addNewDishPage",
    element: <AddNewDishPage></AddNewDishPage>,
  },
  {
    path: "addNewCategoryPage",
    element: <AddNewCategoryPage></AddNewCategoryPage>,
  },
  {
    path: "addNewPromotionPage",
    element: <AddNewPromotionPage></AddNewPromotionPage>,
  },
  {
    path: "dishListPage",
    element: <DishListPage></DishListPage>,
  },
  {
    path: "editDishPage/:id",
    element: <EditDishPage></EditDishPage>,
  },{
    path: "categoryListPage",
    element: <CategoryListPage></CategoryListPage>,
  },
  {
    path: "editCategoryPage/:id",
    element: <EditCategoryPage></EditCategoryPage>,
  },
  {
    path: "promotionListPage",
    element: <PromotionListPage></PromotionListPage>,
  },
  {
    path: "editPromotionPage/:id",
    element: <EditPromotionPage></EditPromotionPage>,
  },
  {
    path: "restaurantMenuPage",
    element: <RestaurantMenuPage></RestaurantMenuPage>,
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
