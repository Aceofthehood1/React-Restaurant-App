import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function DishListPage() {
  const [dishes, setDishes] = useState<any[]>([]);
  const rep_id = sessionStorage.getItem("rep_id");
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
      <SideBar></SideBar>

      <div className="flex flex-col items-center justify-center mb-5 mt-20 ">
          <div className="overflow-x-auto bg-project-green rounded-lg">
            <table className="divide-y-2 divide-cream border-1 text-sm">
              <thead className="">
                <tr>
                  <p className="whitespace-nowrap px-4 py-2 font-medium text-cream text-lg lg:w-[500px]">
                    Name of Dish
                  </p>
                </tr>
              </thead>
              {dishes.map((dish) => {
                return (
                  <>
                    <tbody className="divide-y divide-black">
                      <tr>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-cream">
                          {dish.dish_name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <Link
                            to={`/editDishPage/${dish._id}`}
                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs border-2 border-cream font-medium bg-cream text-black hover:bg-project-green hover:text-cream"
                          >
                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>{" "}
                            Edit
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <button
                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs border-2 border-cream font-medium bg-cream text-black hover:bg-project-green hover:text-cream"
                            onClick={(e) => handleDelete(dish._id)}
                          >
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>{" "}
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
            </table>
          </div>
        </div>
    
    </>
  );
}

export default DishListPage;
