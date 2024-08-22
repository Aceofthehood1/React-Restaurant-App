import { Link } from "react-router-dom";
import restaurantImg from "../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useState } from "react";
function AddNewPromotionPage() {

  const [promotion_title, setPromotionTitle] = useState<string>();
  const [promotion_image, setPromotionImage] = useState<string>();
  const [description, setDescription] = useState<string>();
  const rep_id = sessionStorage.getItem('rep_id');

  const Submit = (e: { preventDefault: () => void }) => {
    if (promotion_title && promotion_image && description) {
      axios
        .post("http://localhost:3001/createPromotion", {
          rep_id,
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
    <SideBar></SideBar>
      
    <form className="flex flex-col justify-center items-center mb-10 mt-20">
        <div className="bg-blue-600 p-6 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-bold mb-2">
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
            <label htmlFor="image" className="block text-lg font-bold mb-2">
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
            <label htmlFor="message" className="block text-lg font-bold mb-2">
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
              className="special-button"
              type="button"
            >
              <span>Add Promotion</span>
            </button>
          </div>
        </div>
      </form>

    </>
  );
}

export default AddNewPromotionPage;