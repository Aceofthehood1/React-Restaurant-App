import { Link } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
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
      <h1 className="text-4xl m-5" id="head">
        Edit Category
      </h1>
      <div className="flex items-center justify-center relative mb-10 lg:absolute">
        <SideBar></SideBar>
      </div>

      <div className="flex flex-col items-center justify-center mb-5">
      <div className="bg-blue-600 p-6 rounded-md shadow-md w-[400px] lg:w-[520px]">
          {categories.map((category) => {
            return (
              <>
                <div className="rounded flex flex-row items-center mb-5">
                  <p className="mr-5 text-white w-72">
                    {category.category_name}
                  </p>
                  <div className="md:flex flex col">
                    <Link to={`/editCategoryPage/${category._id}`}>
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
                      onClick={(e) => handleDelete(category._id)}
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

export default CategoryListPage;
