import { Link } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
function CategoryListPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const rep_id = sessionStorage.getItem('rep_id')

  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllCategoriesByRepId/" + rep_id)
      .then((result) => setCategories(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: any) => {
    axios
      .delete("http://localhost:3001/deleteCategory/" + id)
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
          <div className="overflow-x-auto bg-project-green rounded-lg">
            <table className="divide-y-2 divide-cream border-1 text-sm">
              <thead className="">
                <tr>
                  <p className="whitespace-nowrap px-4 py-2 font-medium text-cream text-lg lg:w-[500px]">
                    Category Name
                  </p>
                </tr>
              </thead>
              {categories.map((category) => {
                return (
                  <>
                    <tbody className="divide-y divide-black">
                      <tr>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-cream">
                          {category.category_name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <Link
                            to={`/editCategoryPage/${category._id}`}
                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs border-2 border-cream font-medium bg-cream text-black hover:bg-project-green hover:text-cream"
                          >
                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>{" "}
                            Edit
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <button
                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs border-2 border-cream font-medium bg-cream text-black hover:bg-project-green hover:text-cream"
                            onClick={(e) => handleDelete(category._id)}
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

export default CategoryListPage;
