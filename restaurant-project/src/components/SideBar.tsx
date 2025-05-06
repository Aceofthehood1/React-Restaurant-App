import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCircleUser,
  faPlus,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faRecycle } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faRectangleAd } from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  const location = useLocation();
  const params = useParams(); // This will extract the ID from the URL if present

  // Function to determine the header based on the current path
  const getHeaderTitle = () => {
    const { id } = params; // Destructure the id from params
    switch (location.pathname) {
      case "/":
        return "Restaurant Admin Section";
      case "/restaurantAdminPage":
        return "Restaurant Admin Home";
      case "/addNewDishPage":
        return "Add New Dish";
      case "/addNewCategoryPage":
        return "Add New Category";
      case "/addNewPromotionPage":
        return "Add New Promotion";
      case "/dishListPage":
        return "Make changes to List of Dishes";
      case "/categoryListPage":
        return "Make changes to List of Categories";
      case "/promotionListPage":
        return "Make changes to List of Promotions";
      case `/editDishPage/${id}`: //Used these quotes so id can be accepted and used
        return "Edit Dish";
      case `/editCategoryPage/${id}`: //Used these quotes so id can be accepted and used
        return "Edit Category";
      case `/editPromotionPage/${id}`: //Used these quotes so id can be accepted and used
        return "Edit Promotion";
      case "/viewCustomerReservationsPage":
        return "Customer Reservations";
      default:
        return "Page Not Found";
    }
  };

  const logOut = (e: { preventDefault: () => any }) => {
    sessionStorage.removeItem("rep_id");
  };
  return (
    <>
      <div className="navbar">
        <div className="navbar-start">
          <details className="dropdown">
            <summary
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-cream"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </summary>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content blue rounded-box z-[1] mt-3 w-72 p-2 shadow text-cream green"
            >
              <li>
                <Link
                  to="/restaurantAdminPage"
                  className="rounded-md px-3 py-2 text-lg font-medium"
                  aria-current="page"
                >
                  <FontAwesomeIcon icon={faCircleUser} /> Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/addNewDishPage"
                  className="rounded-md px-3 py-2 text-lg font-medium"
                  aria-current="page"
                >
                  <FontAwesomeIcon icon={faBowlFood} /> Add New Dish
                </Link>
              </li>
              <li>
                <Link
                  to="/dishListPage"
                  className="rounded-md px-3 py-2 text-lg font-medium"
                >
                  <FontAwesomeIcon icon={faPencil} /> Edit Dish
                </Link>
              </li>
              <li>
                <Link
                  to="/addNewCategoryPage"
                  className="rounded-md px-3 py-2 text-lg font-medium"
                >
                  <FontAwesomeIcon icon={faList} /> Add New Category
                </Link>
              </li>
              <li>
                <Link
                  to="/categoryListPage"
                  className="rounded-md px-3 py-2 text-lg font-medium"
                >
                  {" "}
                  <FontAwesomeIcon icon={faPencil} /> Edit Category
                </Link>
              </li>
              <li>
                <Link
                  to="/addNewPromotionPage"
                  className="rounded-md px-3 py-2 text-lg font-medium"
                >
                  <FontAwesomeIcon icon={faRectangleAd} /> Add New Promotion
                </Link>
              </li>
              <li>
                <Link
                  to="/promotionListPage"
                  className="rounded-md px-3 py-2 text-lg font-medium"
                >
                  {" "}
                  <FontAwesomeIcon icon={faPencil} /> Edit Promotion
                </Link>
                <Link
                  to="/viewCustomerReservationsPage"
                  className="rounded-md px-3 py-2 text-lg font-medium"
                >
                  {" "}
                  <FontAwesomeIcon icon={faCalendar} /> Customer Reservations
                </Link>
              </li>
            </ul>
          </details>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-lg text-cream sm:text-2xl">
            {getHeaderTitle()}
          </a>
        </div>
        <div className="navbar-end">
          <Link
            to="/"
            className="text-cream btn-ghost rounded-md px-3 py-2 text-md font-medium sm:text-lg"
            onClick={logOut}
          >
            <FontAwesomeIcon icon={faDoorOpen} /> Log Out
          </Link>
        </div>
      </div>
    </>
  );
}

export default SideBar;
