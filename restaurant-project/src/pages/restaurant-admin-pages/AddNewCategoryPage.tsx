import { Link } from "react-router-dom";
import restaurantImg from "../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useState } from "react";
function AddNewCategoryPage() {
  const [category_name, setCategoryName] = useState<string>();

  const [category_image, setCategoryImage] = useState<string>();
  const rep_id = sessionStorage.getItem("rep_id");

  const Submit = (e: { preventDefault: () => void }) => {
    if (category_name && category_image) {
      axios
        .post("http://localhost:3001/createCategory", {
          rep_id,
          category_name,
          category_image,
        })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
      alert("You have added a category successfully");
      setCategoryName(""); //to make the input fields empty after clicking on add dish button
      setCategoryImage("");
    } else {
      e.preventDefault(); //to make button not refresh page when its clicked on
      alert("Please fill in all details to continue");
    }
  };

  return (
    <>
      <SideBar></SideBar>

      <form className="flex flex-col justify-center items-center mb-10 mt-20">
        <div className="bg-blue-600 p-6 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-bold mb-2">
              Category Name
            </label>
            <input
              id="category-name"
              type="text"
              placeholder="Enter the Category Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setCategoryName(e.target.value)}
              value={category_name}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-lg font-bold mb-2">
              Upload Image Of Category
            </label>
            <input
              id="category-image"
              type="file"
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setCategoryImage(e.target.value)}
              value={category_image}
            />
          </div>

          <div>
            <button
              onClick={Submit}
              className="special-button"
              type="button"
            >
              <span>Add Category</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddNewCategoryPage;
