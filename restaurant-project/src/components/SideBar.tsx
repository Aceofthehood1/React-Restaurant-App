import { Link } from "react-router-dom";
function SideBar() {
  return (
    <>
        <div className="flex flex-col space-y-2 h-1/2 w-64 bg-blue-800 rounded-md ml-1">
            <Link to="/addNewDishPage" className="text-gray-300 hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-lg font-medium" aria-current="page">Add New Dish</Link>
            <Link to="/dishListPage" className="text-gray-300 hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-lg font-medium">Edit Dish</Link>
            <Link to="/addNewCategoryPage" className="text-gray-300 hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-lg font-medium">Add New Category</Link>
            <Link to="/categoryListPage" className="text-gray-300 hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-lg font-medium">Edit Category</Link>
            <Link to="/addNewPromotionPage" className="text-gray-300 hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-lg font-medium">Add New Promotion</Link>
            <Link to="/promotionListPage" className="text-gray-300 hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-lg font-medium">Edit Promotion</Link>
            <Link to="/" className="text-gray-300 hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-lg font-medium">Log Out</Link>
        </div>
    </>
  );
}

export default SideBar;
