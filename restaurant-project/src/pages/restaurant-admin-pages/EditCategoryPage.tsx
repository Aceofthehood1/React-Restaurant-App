import { Link, useNavigate, useParams } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
function EditCategoryPage() {
  const {id} = useParams()
  const [category_name, setCategoryName] = useState<string>();
  const [category_image, setCategoryImage] = useState<string>();
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3001/getCategory/"+ id)
      .then((result) => {console.log(result.data)
        setCategoryName(result.data.category_name)
        setCategoryImage(result.data.category_image)
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e: { preventDefault: () => void }) =>{
    e.preventDefault()
    if (category_name) {
      axios
        .put("http://localhost:3001/updateCategory/"+id, {
          category_name
        })
        .then((result) => {console.log(result)
          navigate('/categoryListPage')
        } )
        .catch((err) => console.log(err));
      alert("You have successfully updated the category");
    } else {
      e.preventDefault(); //to make button not refresh page when its clicked on
      alert("Please fill in all details to continue");
    }
  }
  
  return (
    <>
      <h1 className="text-4xl m-5" id="head">
        Edit Category
      </h1>
      <div className="sm:flex relative mb-10 lg:absolute">
        <SideBar></SideBar>
      </div>

      <form className="flex flex-col justify-center items-center">
        <div className="bg-blue-600 p-6 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Category Name
            </label>
            <input
              id="category-name"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={category_name}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-bold mb-2">
              Upload Image Of Category
            </label>
            <input
              id="category-image"
              type="file"
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
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

export default EditCategoryPage;