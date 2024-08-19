import { Link, useNavigate, useParams } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
function EditPromotionPage() {
  const {id} = useParams()
  const [promotion_title, setPromotionTitle] = useState<string>();
  const [promotion_image, setPromotionImage] = useState<string>();
  const [description, setDescription] = useState<string>();
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3001/getPromotion/"+ id)
      .then((result) => {console.log(result.data)
        setPromotionTitle(result.data.promotion_title)
        setPromotionImage(result.data.promotion_image)
        setDescription(result.data.description)
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e: { preventDefault: () => void }) =>{
    e.preventDefault()
    if (promotion_title && description) {
      axios
        .put("http://localhost:3001/updatePromotion/"+id, {
          promotion_title,
          description,
        })
        .then((result) => {console.log(result)
          navigate('/promotionListPage')
        } )
        .catch((err) => console.log(err));
      alert("You have successfully updated the promotion");
    } else {
      e.preventDefault(); //to make button not refresh page when its clicked on
      alert("Please fill in all details to continue");
    }
  }
  return (
    <>
      <h1 className="text-4xl m-5" id="head">
        Edit Promotion
      </h1>
      <div className="flex items-center justify-center relative mb-10 lg:absolute">
        <SideBar></SideBar>
      </div>

      <form className="flex flex-col justify-center items-center mb-10">
        <div className="bg-blue-600 p-6 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Promotion Title
            </label>
            <input
              id="promotion-title"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={promotion_title}
              onChange={(e) => setPromotionTitle(e.target.value)}
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
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="promotion-description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
         
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={Update}
            >
              Save
            </button>
          </div>
        </div>
      </form>

      
    </>
  );
}

export default EditPromotionPage;