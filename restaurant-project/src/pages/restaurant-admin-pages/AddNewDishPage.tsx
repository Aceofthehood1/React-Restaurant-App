import { Link } from "react-router-dom";
import restaurantImg from "../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useEffect, useState } from "react";
function AddNewDishPage() {

  const [categories, setCategories] = useState<any[]>([]);
  const rep_id = sessionStorage.getItem('rep_id');

  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllCategoriesByRepId/" + rep_id )
      .then((result) => setCategories(result.data))
      .catch((err) => console.log(err));
  }, []);

  const [dish_name, setDishName] = useState<string>();
  const [dish_image, setDishImage] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [price, setPrice] = useState<number>();

  const Submit = (e: { preventDefault: () => void }) => {
    if (dish_name && description && dish_image && category && price) {
      axios
        .post("http://localhost:3001/createDish", {
          rep_id,
          dish_name,
          dish_image,
          description,
          category,
          price,
        })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
      alert("You have added a dish successfully");
      setDishName(""); //to make the input fields empty after clicking on add dish button
      setDescription("");
      setDishImage("");
      setCategory("");
      setPrice(0);
    } else {
      e.preventDefault(); //to make button not refresh page when its clicked on
      alert("Please fill in all details to continue");
    }
  };
  
  return (
    <>
      <h1 className="text-4xl m-5" id="head">
        Add New Dish
      </h1>
      <div className="flex relative mb-10 items center justify-center lg:absolute">
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
              placeholder="Enter the Dishes Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setDishName(e.target.value)}
              value = {dish_name}
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
              onChange={(e) => setDishImage(e.target.value)}
              value = {dish_image}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Describe the dish"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setDescription(e.target.value)}
              value = {description}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-bold mb-2"
            >
              Category
              <select
                id="category"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setCategory(e.target.value)}
                value = {category}
              >
                <option value="">Select Dish Category</option>
                {categories.map((category) => {
            return (
              <>
                <option value={category._id}>{category.category_name}</option> 
              </>
            );
          })}
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
              placeholder="Price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              value = {price}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={Submit}
            >
              Add Dish
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddNewDishPage;
