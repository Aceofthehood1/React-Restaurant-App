import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
function DishListPage() {
  const [dishes, setDishes] = useState<any[]>([]);
  const rep_id = sessionStorage.getItem('rep_id');
  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllDishesByRepId/" + rep_id)
      .then((result) => setDishes(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: any) => {
    axios
      .delete("http://localhost:3001/deleteDish/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className="text-4xl m-5" id="head">
        List Of Dishes
      </h1>
      <div className="flex items-center justify-center relative mb-10 lg:absolute">
        <SideBar></SideBar>
      </div>

      <div className="flex flex-col items-center justify-center mb-5">
        <div className="bg-blue-600 p-6 rounded-md shadow-md w-[400px] lg:w-[520px]">
          {dishes.map((dish) => {
            return (
              <>
                <div className="rounded flex flex-row items-center mb-5">
                  <p className="mr-5 text-white w-72">{dish.dish_name}</p>
                  <div className="md:flex flex col">
                    <Link to={`/editDishPage/${dish._id}`}>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5 lg:mr-5"
                        type="button"
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={(e) => handleDelete(dish._id)}
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

export default DishListPage;
