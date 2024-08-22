import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faRecycle} from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen} from "@fortawesome/free-solid-svg-icons";
import { faBowlFood} from "@fortawesome/free-solid-svg-icons";
import { faList} from "@fortawesome/free-solid-svg-icons";
import { faRectangleAd} from "@fortawesome/free-solid-svg-icons";


function SideBar() {
  const location = useLocation();
  const params = useParams(); // This will extract the ID from the URL if present

  // Function to determine the header based on the current path
  const getHeaderTitle = () => {
    const { id } = params; // Destructure the id from params
    switch (location.pathname) {
      case '/':
        return 'Restaurant Admin Section';
      case '/restaurantAdminPage':
        return 'Restaurant Admin Home';
      case '/addNewDishPage':
        return 'Add New Dish';
      case '/addNewCategoryPage':
        return 'Add New Category';
        case '/addNewPromotionPage':
        return 'Add New Promotion';
        case '/dishListPage':
        return 'Make changes to List of Dishes';
        case '/categoryListPage':
        return 'Make changes to List of Categories';
        case '/promotionListPage':
        return 'Make changes to List of Promotions';
        case `/editDishPage/${id}`: //Used these quotes so id can be accepted and used
        return 'Edit Dish';
        case `/editCategoryPage/${id}`: //Used these quotes so id can be accepted and used
        return 'Edit Category';
        case `/editPromotionPage/${id}`: //Used these quotes so id can be accepted and used
        return 'Edit Promotion';
      default:
        return 'Page Not Found';
    }
  };
  
  const logOut = (e: { preventDefault: () => any }) => {
    sessionStorage.removeItem('rep_id');
  }
  return (
    <>
    <div className="navbar">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-blue-600 rounded-box z-[1] mt-3 w-60 p-2 shadow">
        <li><Link to="/addNewDishPage" className="text-black hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-lg font-medium" aria-current="page"><FontAwesomeIcon icon={faBowlFood} /> Add New Dish</Link></li>
        <li><Link to="/dishListPage" className="text-black hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-lg font-medium"><FontAwesomeIcon icon={faPencil} /> Edit Dish</Link></li>
        <li><Link to="/addNewCategoryPage" className="text-black hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-lg font-medium"><FontAwesomeIcon icon={faList} /> Add New Category</Link></li>
        <li><Link to="/categoryListPage" className="text-black hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-lg font-medium"> <FontAwesomeIcon icon={faPencil} /> Edit Category</Link></li>
        <li><Link to="/addNewPromotionPage" className= "text-black hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-lg font-medium"><FontAwesomeIcon icon={faRectangleAd} /> Add New Promotion</Link></li>
        <li><Link to="/promotionListPage" className="text-black hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-lg font-medium"> <FontAwesomeIcon icon={faPencil} /> Edit Promotion</Link></li>
        
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost text-lg text-black sm:text-2xl">{getHeaderTitle()}</a>
  </div>
  <div className="navbar-end">
  <Link to="/" className= "text-black hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-md font-medium sm:text-lg" onClick={logOut}><FontAwesomeIcon icon={faDoorOpen} /> Log Out</Link>
  </div>
</div>
    </>
  );
}

export default SideBar;
