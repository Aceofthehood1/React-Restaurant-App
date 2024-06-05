import { Link } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
function EditDishPage() {
  return (
    <>
      <h1 className="text-4xl m-5" id="head">
        Edit Dish
      </h1>
      <div className="sm:flex relative mb-10 lg:absolute">
        <SideBar></SideBar>
      </div>

      <form className="flex flex-col justify-center items-center mb-5">
        <div className="bg-blue-600 p-6 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Dish Name
            </label>
            <input
              id="dish-name"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value="Jollof Rice"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-bold mb-2">
              Upload Image Of Dish
            </label>
            <input
              id="dish-image"
              type="file"
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value="Jollof rice with chicken and pepper"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-sm font-bold mb-2"
            >
              Category
              <select
                id="department"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Dish Category</option>
                <option selected value="sales">Lunch</option>
                <option value="marketing">Dinner</option>
                <option value="finance">BreakFast</option>
                <option value="hr">Brunch</option>
              </select>
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Price
            </label>
            <input
              id="price"
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value="23.00"
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      
    </>
  );
}

export default EditDishPage;