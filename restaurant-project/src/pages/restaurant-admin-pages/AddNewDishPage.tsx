import { Link } from "react-router-dom";
import restaurantImg from "../assets/restaurant-image.jpg";
import SideBar from "../../components/SideBar";
import axios from "axios";
import dishImg from "../../assets/dish.jpg";
import { useEffect, useState } from "react";
function AddNewDishPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const rep_id = sessionStorage.getItem("rep_id");

  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllCategoriesByRepId/" + rep_id)
      .then((result) => setCategories(result.data))
      .catch((err) => console.log(err));
  }, []);

  const [dish_name, setDishName] = useState<string>();
  const [dish_image, setDishImage] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [price, setPrice] = useState<number>();

  const Submit = (e: { preventDefault: () => void }) => {
    if (dish_name && description && category && price) {
      axios
        .post("http://localhost:3001/createDish", {
          rep_id,
          dish_name,
          dish_image,
          description,
          category,
          price,
        })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
      alert("You have added a dish successfully");
      setDishName(""); //to make the input fields empty after clicking on add dish button
      setDescription("");
      setDishImage("");
      setCategory("");
      setPrice(0);
    } else {
      e.preventDefault(); //to make button not refresh page when its clicked on
      alert("Please fill in all details to continue");
    }
  };

  return (
    <>
      <SideBar></SideBar>
      {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

      <section className="cream">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src={dishImg}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Add a new dish
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Here, you add the dishes you want your customers to be able to
                view on the customer page. Make sure to not leave any fields
                empty!
              </p>

              <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="dish_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name of Dish
                  </label>
                  <input
                    id="dish-name"
                    type="text"
                    placeholder="Enter the Dishes Name"
                    className="mt-1 w-full h-[40px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={(e) => setDishName(e.target.value)}
                    value={dish_name}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="dish_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Dish Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Describe the dish"
                    className="mt-1 w-full h-[100px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="dish_image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Upload Image of Dish{" "}
                  </label>
                  <input
                    id="dish-image"
                    type="file"
                    accept="image/*"
                    className="mt-1 w-full h-[40px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={(e) => setDishImage(e.target.value)}
                    value={dish_image}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Category{" "}
                  </label>

                  <select
                    id="category"
                    className="mt-1 w-full h-[40px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option value="">Select Dish Category</option>
                    {categories.map((category) => {
                      return (
                        <>
                          <option value={category._id}>
                            {category.category_name}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>

                  <input
                    id="price"
                    type="number"
                    placeholder="Price"
                    className="mt-1 w-full h-[40px] rounded-md bg-white text-sm text-gray-700 shadow-sm p-2 border-2 border-black"
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    value={price}
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    className="text-cream inline-block shrink-0 rounded-md border green px-12 py-3 text-sm font-medium transition hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus:ring"
                    onClick={Submit}
                  >
                    Add Dish
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default AddNewDishPage;
