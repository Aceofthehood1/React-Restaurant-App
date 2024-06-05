import { Link } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
function PromotionListPage() {
  return (
    <>
      <h1 className="text-4xl m-5" id="head">
        Edit Promotion
      </h1>
      <div className="sm:flex relative mb-10 lg:absolute">
        <SideBar></SideBar>
      </div>

      <div className="flex flex-col items-center justify-center mb-5">
    <div className="bg-blue-600 p-6 rounded-md shadow-md">
        <div className="rounded flex flex-row items-center mb-5">
            <p className="mr-5 text-white">New Dish added</p>
            <Link to="/editPromotionPage">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5"
              type="button"
            >
              Edit
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Delete
            </button>
            </Link>
        </div>
        <div className="rounded flex flex-row items-center mb-5">
            <p className="mr-5 text-white">New Dish added</p>
            <Link to="/editPromotionPage">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5"
              type="button"
            >
              Edit
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Delete
            </button>
            </Link>
        </div>
        <div className="rounded flex flex-row items-center mb-5">
            <p className="mr-5 text-white">New Dish added</p>
            <Link to="/editPromotionPage">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5"
              type="button"
            >
              Edit
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Delete
            </button>
            </Link>
        </div>
        <div className="rounded flex flex-row items-center mb-5">
            <p className="mr-5 text-white">New Dish added</p>
            <Link to="/editPromotionPage">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5"
              type="button"
            >
              Edit
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Delete
            </button>
            </Link>
        </div>
        <div className="rounded flex flex-row items-center mb-5">
            <p className="mr-5 text-white">New Dish added</p>
            <Link to="/editPromotionPage">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5"
              type="button"
            >
              Edit
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Delete
            </button>
            </Link>
        </div>
        </div>
        </div>
      
    </>
  );
}

export default PromotionListPage;