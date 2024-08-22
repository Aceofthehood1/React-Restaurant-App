import { Link, useNavigate, useParams } from "react-router-dom";
import restaurantImg from "../../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
function EditDishPage() {

  const [categories, setCategories] = useState<any[]>([]);
  const rep_id = sessionStorage.getItem('rep_id');

  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllCategoriesByRepId/" + rep_id)
      .then((result) => setCategories(result.data))
      .catch((err) => console.log(err));
  }, []);

  const {id} = useParams()
  const [dish_name, setDishName] = useState<string>();
  const [dish_image, setDishImage] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [price, setPrice] = useState<number>();
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3001/getDish/"+ id)
      .then((result) => {console.log(result.data)
        setDishName(result.data.dish_name)
        setDishImage(result.data.dish_image)
        setDescription(result.data.description)
        setCategory(result.data.category)
        setPrice(result.data.price)
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e: { preventDefault: () => void }) =>{
    e.preventDefault()
    if (dish_name && description && category && price) {
      axios
        .put("http://localhost:3001/updateDish/"+id, {
          dish_name,
          description,
          category,
          price
        })
        .then((result) => {console.log(result)
          navigate('/dishListPage')
        } )
        .catch((err) => console.log(err));
      alert("You have successfully updated the dish");
    } else {
      e.preventDefault(); //to make button not refresh page when its clicked on
      alert("Please fill in all details to continue");
    }
  }
  
  return (
    <>
        <SideBar></SideBar>

      <form className="flex flex-col justify-center items-center mb-5 mt-20">
        <div className="bg-blue-600 p-6 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-bold mb-2">
              Dish Name
            </label>
            <input
              id="dish-name"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={dish_name}
              onChange={(e) => setDishName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-lg font-bold mb-2">
              Upload Image Of Dish
            </label>
            <input
              id="dish-image"
              type="file"
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-bold mb-2">
              Description
            </label>
            <textarea
              id="message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-lg font-bold mb-2"
            >
              Category
              <select
                id="department"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Dish Category</option>
                {categories.map((category) => {
            return (
              <>
                <option value={category._id}>{category.category_name}</option> 
              </>
            );
          })}
              </select>
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-bold mb-2">
              Price
            </label>
            <input
              id="price"
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <button
              className="special-button"
              type="button"
              onClick={Update}
            >
              <span>Save</span>
            </button>
          </div>
        </div>
      </form>
      
    </>
  );
}

export default EditDishPage;