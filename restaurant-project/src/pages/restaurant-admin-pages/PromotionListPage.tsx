import { Link } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
function PromotionListPage() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const rep_id = sessionStorage.getItem('rep_id');

  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllPromotionsByRepId/" + rep_id)
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
        <SideBar></SideBar>

      <div className="flex flex-col items-center justify-center mb-5 mt-20">
      <div className="bg-blue-600 p-6 rounded-md shadow-md w-[400px] lg:w-[520px]">
          {promotions.map((promotion) => {
            return (
              <>
                <div className="rounded flex flex-row items-center mb-5">
                  <p className="mr-5 text-lg font-bold w-72">
                    {promotion.promotion_title}
                  </p>
                  <div className="md:flex flex col">
                    <Link to={`/editPromotionPage/${promotion._id}`}>
                      <button
                       className="w-[100px] bg-blue-500 hover:bg-black hover:text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5 lg:mr-5"
                      type="button"
                      >
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit
                      </button>
                    </Link>
                    <button
                    className="w-[100px] bg-red-600 text-white hover:text-red-600 hover:bg-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={(e) => handleDelete(promotion._id)}
                    >
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete
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
