import { Link } from "react-router-dom";
import restaurantImg from "../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useState } from "react";
function AddNewPromotionPage() {

  const [promotion_title, setPromotionTitle] = useState<string>();
  const [promotion_image, setPromotionImage] = useState<string>();
  const [description, setDescription] = useState<string>();

  const Submit = (e: { preventDefault: () => void }) => {
    if (promotion_title && promotion_image && description) {
      axios
        .post("http://localhost:3001/createPromotion", {
          promotion_title,
          promotion_image,
          description
        })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
      alert("You have added a promotion sucessfully");
      setPromotionTitle(""); //to make the input fields empty after clicking on add dish button
      setPromotionImage("");
      setDescription("");
    } else {
      e.preventDefault(); //to make button not refresh page when its clicked on
      alert("Please fill in all details to continue");
    }
  };

  return (
    <>
      <h1 className="text-4xl m-5" id="head">
        Add New Promotion
      </h1>
      <div className="sm:flex relative mb-10 lg:absolute">
      <SideBar></SideBar>
    </div>
      
    <form className="flex flex-col justify-center items-center">
        <div className="bg-blue-600 p-6 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Promotion Title
            </label>
            <input
              id="promotion-title"
              type="text"
              placeholder="Enter the Promotion Title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setPromotionTitle(e.target.value)}
              value = {promotion_title}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-bold mb-2">
              Upload Image Of Promotion
            </label>
            <input
              id="promtion-image"
              type="file"
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setPromotionImage(e.target.value)}
              value = {promotion_image}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="promotion-description"
              placeholder="Describe the promotion"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setDescription(e.target.value)}
              value = {description}
            ></textarea>
          </div>
         
          <div>
            <button
              onClick={Submit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Add Promotion
            </button>
          </div>
        </div>
      </form>

    </>
  );
}

export default AddNewPromotionPage;