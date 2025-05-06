import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faKitchenSet, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faCalendarXmark } from "@fortawesome/free-solid-svg-icons";



function CustomerBar() {
  const location = useLocation();
  const params = useParams(); // This will extract the ID from the URL if present

  // Function to determine the header based on the current path
  const getHeaderTitle = () => {
    const { id } = params; // Destructure the id from params
    switch (location.pathname) {
      case "/customerHomePage":
        return "Restaurants";
      case `/restaurantPage/${id}`: //Used these quotes so id can be accepted and used
        return "Home";
      case "/restaurantMenuPage":
        return "Menu";
        case "/restaurantReservationPage":
          return "Reservations";
        case "/viewReservationsPage":
        return "Your Reservations";
      default:
        return "Page Not Found";
    }
  };

  const code = sessionStorage.getItem('restaurant_id'); // variable to store restaurant_id so the home button will make user see the restaurant based on id stored
  const logOut = (e: { preventDefault: () => any }) => {
    sessionStorage.removeItem("customer_id");
  };
  return (
    <>
      <div className="navbar">
        <div className="navbar-start">
          {location.pathname != "/customerHomePage"? <details className="dropdown">
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
                  to={`/restaurantPage/${code}`}
                  className="rounded-md px-3 py-2 text-lg font-medium"
                  aria-current="page"
                >
                  <FontAwesomeIcon icon={faHouse} /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/restaurantMenuPage"
                  className="rounded-md px-3 py-2 text-lg font-medium"
                >
                  <FontAwesomeIcon icon={faUtensils} /> Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/restaurantReservationPage"
                  className="rounded-md px-3 py-2 text-lg font-medium"
                >
                  <FontAwesomeIcon icon={faCalendar} /> Reservations
                </Link>
              </li>
              <li>
                <Link
                  to="/viewReservationsPage"
                  className="rounded-md px-3 py-2 text-lg font-medium"
                >
                  {" "}
                  <FontAwesomeIcon icon={faCalendarXmark} /> Your Reservations
                </Link>
              </li>
              <li>
                <Link
                  to="/customerHomePage"
                  className="rounded-md px-3 py-2 text-lg font-medium"
                >
                  {" "}
                  <FontAwesomeIcon icon={faKitchenSet} /> Other Restaurants
                </Link>
              </li>
            </ul>
          </details> :""
          }
          
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

export default CustomerBar;