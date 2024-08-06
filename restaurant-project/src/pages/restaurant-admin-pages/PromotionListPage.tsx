import { Link } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
function PromotionListPage() {
  const [promotions, setPromotions] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllPromotions")
      .then((result) => setPromotions(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: any) => {
    axios
      .delete("http://localhost:3001/deletePromotion/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

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
          {promotions.map((promotion) => {
            return (
              <>
                <div className="rounded flex flex-row items-center mb-5">
                  <p className="mr-5 text-white w-72">
                    {promotion.promotion_title}
                  </p>
                  <div>
                    <Link to={`/editPromotionPage/${promotion._id}`}>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5"
                        type="button"
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={(e) => handleDelete(promotion._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PromotionListPage;
